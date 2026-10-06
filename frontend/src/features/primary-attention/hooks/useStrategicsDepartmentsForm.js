// frontend/src/features/primary-attention/hooks/useAreasEstrategicasForm.js
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { documentoSchema } from "../validations/areasEstrategicas.schema.js";
import { INDICADORES, DERIVADOS } from "../config/areasEstrategicas.config.js";
import { seedValores, contarPreenchidos } from "../utils/areasEstrategicas.utils.js";
import { useAreasEstrategicasStore } from "../store/areasEstrategicas.store.js";
import { toDocumento, toApiPayload } from "../mappers/areasEstrategicas.mapper.js";
import { areasEstrategicasApi } from "../api/areasEstrategicasApi.js";

const DEFAULT_VALUES = {
  bloco: "consultas",
  mes: "",
  ano: 2026,
  valores: seedValores("consultas"),
};

export function useAreasEstrategicasForm({ onSuccess } = {}) {
  const [erroDuplicado, setErroDuplicado] = useState(null);
  const [erroServidor, setErroServidor] = useState(null);

  const addRegistro = useAreasEstrategicasStore((s) => s.addRegistro);
  const isDuplicado = useAreasEstrategicasStore((s) => s.isDuplicado);

  const form = useForm({
    resolver: zodResolver(documentoSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const bloco = useWatch({ control: form.control, name: "bloco" });
  const valores = useWatch({ control: form.control, name: "valores" });

  // Switching block → full re-seed of valores (no cross-block leakage)
  useEffect(() => {
    form.setValue("valores", seedValores(bloco), {
      shouldValidate: false,
      shouldDirty: false,
    });
    setErroDuplicado(null);
  }, [bloco, form]);

  const preenchidos = contarPreenchidos(valores);
  const totalIndicadores = INDICADORES[bloco].length;

  const derivados = useMemo(
    () =>
      DERIVADOS[bloco].map((d) => ({
        ...d,
        valor: d.calc(valores ?? {}),
      })),
    [bloco, valores]
  );

  const handleSubmit = form.handleSubmit(
    useCallback(
      async (data) => {
        setErroServidor(null);

        // Client-side duplicate guard (mirrors backend unique index)
        if (isDuplicado(data.bloco, data.mes, data.ano)) {
          setErroDuplicado(
            `Já existe um registro para ${data.mes}/${data.ano} neste bloco.`
          );
          return;
        }
        setErroDuplicado(null);

        const documento = toDocumento(data);

        try {
          await areasEstrategicasApi.create(toApiPayload(documento));
        } catch (err) {
          // Offline / backend not built yet — keep the record locally
          // Uncomment the next 2 lines once backend is real to fail loudly:
          // setErroServidor(err.response?.data?.message || "Erro ao salvar.");
          // return;
        }

        addRegistro(documento);
        onSuccess?.(documento);
        form.reset({
          ...DEFAULT_VALUES,
          bloco: data.bloco,
          ano: data.ano,
          valores: seedValores(data.bloco),
        });
      },
      [form, onSuccess, isDuplicado, addRegistro]
    )
  );

  return {
    form,
    handleSubmit,
    bloco,
    preenchidos,
    totalIndicadores,
    derivados,
    erroDuplicado,
    erroServidor,
  };
}