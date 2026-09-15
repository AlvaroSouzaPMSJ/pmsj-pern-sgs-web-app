import { useEffect, useMemo, useState, useCallback } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Footer from "../../../app/layouts/Footer";
import GNavbar from "../../../app/layouts/GNavbar";

// CONSTANTS

const MESES = /** @type {const} */ ([
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]);

/** Indicator value types — formatting + validation only, never persisted. */
const TIPO = /** @type {const} */ ({
  CONTAGEM: "contagem", // inteiro ≥ 0
  PROPORCAO: "proporcao", // percentual, decimal ≥ 0
  TAXA: "taxa", // coeficiente / taxa, decimal ≥ 0
});

/**
 * Single source of truth.
 * Each indicador: { chave, label, tipo, meta?, parametro?, fonte? }.
 * `meta`/`parametro`/`fonte` are constants-only (helper text), never stored.
 */
const VIGILANCIA_INDICADORES = {
  "nascidos-vivos": {
    label: "Nascidos Vivos (SINASC)",
    indicadores: [
      { chave: "nvTotal", label: "Número de nascidos vivos (NV)", tipo: TIPO.CONTAGEM, fonte: "SINASC" },
      { chave: "nvPartoNormal", label: "NV por parto normal de mães residentes", tipo: TIPO.CONTAGEM },
      { chave: "nvPartoDomiciliar", label: "NV por parto domiciliar de mães residentes", tipo: TIPO.CONTAGEM },
      { chave: "nvPartoNormalSus", label: "NV por parto normal de mães residentes, no SUS", tipo: TIPO.CONTAGEM },
      { chave: "nvPartoNormalSupl", label: "NV por parto normal de mães residentes, na saúde suplementar", tipo: TIPO.CONTAGEM },
      { chave: "nvCesareo", label: "NV de parto cesáreo", tipo: TIPO.CONTAGEM },
      { chave: "propPartoNormal", label: "Proporção de parto normal no SUS e na saúde suplementar", tipo: TIPO.PROPORCAO },
      { chave: "nvPartoNaoInformado", label: "NV de parto não informado", tipo: TIPO.CONTAGEM },
      { chave: "nvBaixoPeso", label: "NV com baixo peso ao nascer", tipo: TIPO.CONTAGEM },
      { chave: "nvMaeAdolescente", label: "NV de mães adolescentes (10 a 19 anos) residentes", tipo: TIPO.CONTAGEM },
      { chave: "propGravidezAdolescente", label: "Proporção de gravidez na adolescência (10 a 19 anos)", tipo: TIPO.PROPORCAO },
      { chave: "nvPreNatal7Mais", label: "NV de mães com 7 ou mais consultas de pré-natal", tipo: TIPO.CONTAGEM },
      { chave: "propPreNatal7Mais", label: "Proporção de NV de mães com 7 ou mais consultas de pré-natal", tipo: TIPO.PROPORCAO },
      { chave: "nvSemPreNatal", label: "NV de mães sem nenhuma consulta de pré-natal", tipo: TIPO.CONTAGEM },
      { chave: "nvPreNatalIgnorado", label: "NV de mães com pré-natal ignorado (não informado)", tipo: TIPO.CONTAGEM },
      { chave: "nvPreNatalIncompleto", label: "NV de mães com pré-natal incompleto", tipo: TIPO.CONTAGEM },
    ],
  },

  mortalidade: {
    label: "Mortalidade (SIM)",
    indicadores: [
      { chave: "propObitosMifInvestigados", label: "Proporção de óbitos investigados em MIF (10 a 49 anos)", tipo: TIPO.PROPORCAO },
      { chave: "obitosMif", label: "Óbitos em mulheres em idade fértil (10 a 49 anos)", tipo: TIPO.CONTAGEM },
      { chave: "obitosMifInvestigados", label: "Óbitos em MIF (10 a 49 anos) investigados", tipo: TIPO.CONTAGEM },
      { chave: "obitosFetais", label: "Óbitos fetais", tipo: TIPO.CONTAGEM },
      { chave: "obitosFetaisInvestigados", label: "Óbitos fetais investigados", tipo: TIPO.CONTAGEM },
      { chave: "obitosMenor1", label: "Óbitos em menores de 1 ano", tipo: TIPO.CONTAGEM },
      { chave: "obitosMenor1Investigados", label: "Óbitos em menores de 1 ano investigados", tipo: TIPO.CONTAGEM },
      { chave: "obitosMaternos", label: "Óbitos maternos no período e local de residência", tipo: TIPO.CONTAGEM },
      { chave: "obitosMaternosInvestigados", label: "Óbitos maternos investigados", tipo: TIPO.CONTAGEM },
      { chave: "obitosAids", label: "Óbitos por AIDS", tipo: TIPO.CONTAGEM },
      { chave: "taxaMortInfantil", label: "Taxa de Mortalidade Infantil", tipo: TIPO.TAXA },
      { chave: "obitosTuberculose", label: "Óbitos por Tuberculose", tipo: TIPO.CONTAGEM },
      { chave: "propMortPrematuraDcnt", label: "Proporção de mortalidade prematura (30 a 69 anos) pelas 4 principais DCNT", tipo: TIPO.PROPORCAO },
      { chave: "obitosDengue", label: "Óbitos por dengue", tipo: TIPO.CONTAGEM },
      { chave: "propObitosCausaDefinida", label: "Proporção de registro de óbitos com causa básica definida", tipo: TIPO.PROPORCAO },
      { chave: "obitosSuicidio", label: "Óbitos por suicídio de residentes em São José", tipo: TIPO.CONTAGEM, fonte: "SIM" },
      {
        chave: "propObitosSim60dias",
        label: "Proporção de registros de óbitos inseridos no SIM em até 60 dias após o final do mês de ocorrência",
        tipo: TIPO.PROPORCAO,
        meta: "90% até 60 dias",
        parametro: "PORTARIA GM/MS nº 6.878/2025",
      },
    ],
  },

  arboviroses: {
    label: "Arboviroses e Controle Vetorial",
    indicadores: [
      { chave: "dengueAutoctones", label: "Casos novos autóctones de dengue confirmados", tipo: TIPO.CONTAGEM },
      { chave: "dengueImportados", label: "Casos novos confirmados/importados de dengue", tipo: TIPO.CONTAGEM },
      { chave: "dengueSuspeitos", label: "Casos suspeitos de dengue notificados", tipo: TIPO.CONTAGEM },
      { chave: "chikungunyaAutoctones", label: "Casos novos autóctones de chikungunya confirmados", tipo: TIPO.CONTAGEM },
      { chave: "chikungunyaImportados", label: "Casos novos confirmados/importados de chikungunya", tipo: TIPO.CONTAGEM },
      { chave: "chikungunyaSuspeitos", label: "Casos suspeitos de chikungunya notificados", tipo: TIPO.CONTAGEM },
      { chave: "zikaAutoctones", label: "Casos novos autóctones de zika vírus confirmados", tipo: TIPO.CONTAGEM },
      { chave: "zikaImportados", label: "Casos novos confirmados/importados de zika vírus", tipo: TIPO.CONTAGEM },
      { chave: "zikaSuspeitos", label: "Casos suspeitos de zika vírus notificados", tipo: TIPO.CONTAGEM },
      { chave: "focosEncontrados", label: "Focos de dengue encontrados", tipo: TIPO.CONTAGEM },
      { chave: "focosTratados", label: "Focos de dengue tratados", tipo: TIPO.CONTAGEM },
      { chave: "propArmadilhasMonitoradas", label: "Proporção de armadilhas monitoradas", tipo: TIPO.PROPORCAO },
      { chave: "ciclosCobertura80", label: "Ciclos que atingiram ≥ 80% de cobertura de imóveis visitados", tipo: TIPO.CONTAGEM },
      { chave: "propImoveis4Ciclos", label: "Proporção de imóveis visitados em ≥ 4 ciclos de visitas domiciliares", tipo: TIPO.PROPORCAO },
      { chave: "propImoveisAreaFoco", label: "Proporção de imóveis monitorados em áreas de foco", tipo: TIPO.PROPORCAO },
      { chave: "propPontosEstrategicos", label: "Proporção de pontos estratégicos monitorados", tipo: TIPO.PROPORCAO },
      { chave: "ciclosIniciados", label: "Ciclos para controle da dengue iniciados", tipo: TIPO.CONTAGEM },
      { chave: "ciclosConcluidos", label: "Ciclos para controle da dengue concluídos", tipo: TIPO.CONTAGEM },
      { chave: "imoveisVisitadosCiclo", label: "Imóveis visitados em cada ciclo de visitas domiciliares de rotina", tipo: TIPO.CONTAGEM },
      { chave: "imoveisBaseRg", label: "Imóveis da base de reconhecimento geográfico atualizado", tipo: TIPO.CONTAGEM },
      {
        chave: "propObitosArbovirosesEncerrados60d",
        label: "Proporção de óbitos suspeitos de dengue/chikungunya encerrados em até 60 dias da notificação",
        tipo: TIPO.PROPORCAO,
        parametro: "PORTARIA GM/MS nº 6.878/2025",
      },
    ],
  },

  dants: {
    label: "DANTs, Tabagismo e Violência",
    indicadores: [
      { chave: "propOcupacaoNotificacoesTrabalho", label: 'Proporção de preenchimento do campo "ocupação" em notificações de agravos do trabalho', tipo: TIPO.PROPORCAO },
      { chave: "agravosTrabalhoNotificados", label: "Casos de doença/agravo relacionados ao trabalho notificados por local de residência", tipo: TIPO.CONTAGEM },
      { chave: "violenciaAutoprovocadaResidentes", label: "Notificações de violência interpessoal/autoprovocada de residentes em SJ", tipo: TIPO.CONTAGEM },
      { chave: "violenciaServicosSj", label: "Notificações de violência interpessoal/autoprovocada por serviços de SJ (independente de residência)", tipo: TIPO.CONTAGEM },
      { chave: "violenciaMulheres18", label: "Notificações de violência contra mulheres acima de 18 anos, residentes de SJ", tipo: TIPO.CONTAGEM },
      { chave: "violenciaCriancasAdolescentes", label: "Notificações de violência contra crianças e adolescentes até 18 anos, residentes de SJ", tipo: TIPO.CONTAGEM },
      { chave: "propViolenciaAcompUbs", label: "Proporção das notificações de violência acompanhadas pelas UBS", tipo: TIPO.PROPORCAO },
      { chave: "violenciaIdosos", label: "Notificações de violência contra idosos, residentes de SJ", tipo: TIPO.CONTAGEM },
      { chave: "tabagismoIniciaram", label: "Pessoas que iniciaram tratamento no programa do tabagismo", tipo: TIPO.CONTAGEM },
      { chave: "tabagismoEquipes", label: "Equipes de saúde que realizam tratamento individual/coletivo", tipo: TIPO.CONTAGEM },
      { chave: "propUnidadesTabagismoQuad", label: "Proporção de unidades que realizaram tratamento para tabagismo no quadrimestre", tipo: TIPO.PROPORCAO },
      { chave: "tabagismoMasculino", label: "Pacientes atendidos no programa de tabagismo — masculino", tipo: TIPO.CONTAGEM },
      { chave: "tabagismoFeminino", label: "Pacientes atendidos no programa de tabagismo — feminino", tipo: TIPO.CONTAGEM },
      { chave: "tabagismoMenor18", label: "Pacientes com idade ≤ 18 anos", tipo: TIPO.CONTAGEM },
      { chave: "tabagismoMenor60", label: "Pacientes com idade ≤ 60 anos", tipo: TIPO.CONTAGEM },
      { chave: "tabagismoMaior60", label: "Pacientes com idade > 60 anos", tipo: TIPO.CONTAGEM },
      { chave: "tabagismo1aConsulta", label: "Pacientes atendidos na 1ª consulta de avaliação clínica", tipo: TIPO.CONTAGEM },
      { chave: "tabagismoSessaoEstruturada", label: "Pacientes que participaram de sessão estruturada", tipo: TIPO.CONTAGEM },
      { chave: "tabagismoUsoMedicamento", label: "Pacientes que usaram medicamento para cessar o tabagismo", tipo: TIPO.CONTAGEM },
      { chave: "tabagismoNovosMes", label: "Pacientes novos cadastrados no programa de tabagismo no mês", tipo: TIPO.CONTAGEM },
      { chave: "propAcessoHospObitosAcidente", label: "Proporção de acesso hospitalar dos óbitos por acidente", tipo: TIPO.PROPORCAO },
      { chave: "violenciaResidentesSj", label: "Notificações de violência dos residentes de São José", tipo: TIPO.CONTAGEM },
      { chave: "tabagismoDeixaramFumar", label: "Fumantes que deixaram de fumar (absoluto)", tipo: TIPO.CONTAGEM },
      { chave: "tabagismoAbandonaram", label: "Fumantes que abandonaram o tratamento (absoluto)", tipo: TIPO.CONTAGEM },
      { chave: "tabagismoSessaoManutencao", label: "Pacientes que participaram de sessão de manutenção", tipo: TIPO.CONTAGEM },
      { chave: "tabagismoManutencao6m", label: "Pacientes em manutenção há pelo menos 6 meses", tipo: TIPO.CONTAGEM },
      { chave: "propTabagismoDeixaramQuad", label: "Proporção de cadastrados que deixaram de fumar no quadrimestre", tipo: TIPO.PROPORCAO },
      { chave: "propTabagismoAbandonaram", label: "Proporção de cadastrados que abandonaram o tratamento", tipo: TIPO.PROPORCAO },
      { chave: "propUnidadesAtendimentoTabagismo", label: "Proporção das unidades que realizam atendimento ao Tabagismo", tipo: TIPO.PROPORCAO },
    ],
  },

  "portaria-715": {
    label: "Indicadores Portaria MS nº 715",
    indicadores: [
      { chave: "nascMae14a19", label: "Nascimentos de mães de 14 a 19 anos, por município de residência", tipo: TIPO.CONTAGEM, parametro: "Portaria MS nº 715" },
      { chave: "propApgar5Menor7", label: "Proporção de RN com Apgar do 5º minuto < 7, por local de ocorrência", tipo: TIPO.PROPORCAO, parametro: "Portaria MS nº 715" },
      { chave: "propRnExtremoBaixoPeso", label: "Proporção de RN com extremo baixo peso (< 1.000g), por município de residência", tipo: TIPO.PROPORCAO, parametro: "Portaria MS nº 715" },
      { chave: "propRnMuitoBaixoPeso", label: "Proporção de RN com muito baixo peso (1.000–1.499g), por município de residência", tipo: TIPO.PROPORCAO, parametro: "Portaria MS nº 715" },
      { chave: "propRnBaixoPeso", label: "Proporção de RN com baixo peso (< 2.500g)", tipo: TIPO.PROPORCAO, parametro: "Portaria MS nº 715" },
      { chave: "taxaMortMenor1", label: "Taxa de mortalidade em menores de 1 ano (ou nº absoluto p/ < 80 mil hab.)", tipo: TIPO.TAXA, parametro: "Portaria MS nº 715" },
      { chave: "taxaMortFetal", label: "Taxa de mortalidade fetal", tipo: TIPO.TAXA, parametro: "Portaria MS nº 715" },
      { chave: "taxaSifilisCongenitaMenor1", label: "Taxa de incidência de sífilis congênita em menores de 1 ano", tipo: TIPO.TAXA, parametro: "Portaria MS nº 715" },
      { chave: "testeRapidoGravidez12sem", label: "Mulheres de 14 a 49 anos com teste rápido de gravidez antes da 12ª semana, por residência", tipo: TIPO.CONTAGEM, parametro: "Portaria MS nº 715" },
      { chave: "nascMaeMenor14", label: "Nascimentos/óbito fetal de mães < 14 anos, por município de residência", tipo: TIPO.CONTAGEM, parametro: "Portaria MS nº 715" },
    ],
  },

  "hanseniase-tb": {
    label: "Hanseníase e Tuberculose",
    indicadores: [
      { chave: "hansCasosNovosAntigos", label: "Casos novos e antigos de Hanseníase", tipo: TIPO.CONTAGEM },
      { chave: "hansCasosNovos", label: "Casos novos de Hanseníase", tipo: TIPO.CONTAGEM },
      { chave: "hansEmTratamento", label: "Casos de Hanseníase em tratamento (casos novos no período)", tipo: TIPO.CONTAGEM },
      { chave: "taxaPrevHanseniase", label: "Taxa de prevalência anual de hanseníase por 10 mil hab.", tipo: TIPO.TAXA },
      { chave: "propCuraHanseniaseCoortes", label: "Proporção de cura de casos novos de Hanseníase (coortes)", tipo: TIPO.PROPORCAO },
      { chave: "propContatosHanseniase", label: "Proporção de contatos examinados de casos novos de Hanseníase", tipo: TIPO.PROPORCAO },
      { chave: "tbCasosNovos", label: "Casos novos de TB", tipo: TIPO.CONTAGEM },
      { chave: "tbEmTratamento", label: "Casos de tuberculose em tratamento (casos novos do período)", tipo: TIPO.CONTAGEM },
      { chave: "tbPulmonarConfLab", label: "Casos novos de TB pulmonar com confirmação laboratorial", tipo: TIPO.CONTAGEM },
      { chave: "coinfeccaoHivTb", label: "Pessoas coinfectadas HIV/TB", tipo: TIPO.CONTAGEM },
      { chave: "propCuraTbBacilifera", label: "Proporção de cura de TB pulmonar bacilífera com confirmação laboratorial", tipo: TIPO.PROPORCAO },
      { chave: "propAntiHivTb", label: "Proporção de exames anti-HIV entre casos novos de TB", tipo: TIPO.PROPORCAO },
      { chave: "propTbPulmonarConfLab", label: "Proporção de casos novos de TB pulmonar com confirmação laboratorial (Sinan)", tipo: TIPO.PROPORCAO, fonte: "Sinan" },
      { chave: "propCulturaEscarroRetratamento", label: "Proporção de cultura de escarro entre os casos de retratamento (Sinan)", tipo: TIPO.PROPORCAO, fonte: "Sinan" },
      { chave: "propContatosHanseniaseCoortes", label: "Proporção de contatos examinados de casos novos de hanseníase (coortes)", tipo: TIPO.PROPORCAO, parametro: "PORTARIA GM/MS nº 6.878/2025" },
      { chave: "propContatosTbPulmonarConfLab", label: "Proporção de contatos examinados de casos novos de TB pulmonar com confirmação laboratorial", tipo: TIPO.PROPORCAO, parametro: "PORTARIA GM/MS nº 6.878/2025" },
    ],
  },

  hepatites: {
    label: "Hepatites Virais",
    indicadores: [
      { chave: "hepBCasosNovos", label: "Casos novos de Hepatite B", tipo: TIPO.CONTAGEM },
      { chave: "hepBGestantes", label: "Casos novos de Hepatite B em gestantes", tipo: TIPO.CONTAGEM },
      { chave: "hepCCasosNovos", label: "Casos novos de Hepatite C", tipo: TIPO.CONTAGEM },
      { chave: "testeRapidoHepC", label: "Testes rápidos de Hepatite C", tipo: TIPO.CONTAGEM },
      { chave: "testeRapidoHepB", label: "Testes rápidos de Hepatite B", tipo: TIPO.CONTAGEM },
      { chave: "coinfeccaoHivHepB", label: "Pessoas coinfectadas HIV/AIDS/Hepatite B", tipo: TIPO.CONTAGEM },
      { chave: "obitosHepB", label: "Óbitos por Hepatite B", tipo: TIPO.CONTAGEM },
      { chave: "coinfeccaoHivHepC", label: "Pessoas coinfectadas HIV/AIDS/Hepatite C", tipo: TIPO.CONTAGEM },
      { chave: "obitosHepC", label: "Óbitos por Hepatite C", tipo: TIPO.CONTAGEM },
      { chave: "coefMortHepB", label: "Coeficiente de mortalidade por hepatite B por 100.000 hab. (SIM)", tipo: TIPO.TAXA, fonte: "SIM", parametro: "Nota Técnica nº 187/2024" },
      { chave: "taxaDeteccaoHepB", label: "Taxa de detecção da hepatite B por 100.000 hab., 30% acima da média nacional (Sinan)", tipo: TIPO.TAXA, fonte: "Sinan", parametro: "Nota Técnica nº 187/2024" },
      { chave: "coefMortHepC", label: "Coeficiente de mortalidade por hepatite C por 100.000 hab. (SIM)", tipo: TIPO.TAXA, fonte: "SIM" },
      { chave: "taxaDeteccaoHepC", label: "Taxa de detecção da hepatite C por 100.000 hab., 30% acima da média nacional (Sinan)", tipo: TIPO.TAXA, fonte: "Sinan", parametro: "Nota Técnica nº 187/2024" },
    ],
  },

  "transmissao-vertical": {
    label: "Transmissão Vertical (Sífilis / HIV / Hepatites / TB)",
    indicadores: [
      { chave: "propGestantesTestadasSifilis", label: "Proporção de gestantes testadas para sífilis no pré-natal", tipo: TIPO.PROPORCAO, fonte: "SISAB" },
      { chave: "propGestantesTratadasSifilis", label: "Proporção de gestantes tratadas adequadamente para sífilis", tipo: TIPO.PROPORCAO, fonte: "Sinan" },
      { chave: "pctSifilisCongenitaSobreGestantes", label: "Percentual de sífilis congênita sobre total de sífilis em gestantes", tipo: TIPO.PROPORCAO },
      { chave: "taxaDeteccaoSifilisAdquirida", label: "Taxa de detecção de sífilis adquirida por 100.000 hab.", tipo: TIPO.TAXA, fonte: "Sinan" },
      { chave: "propGestantesTestadasHiv", label: "Proporção de gestantes testadas para HIV no pré-natal", tipo: TIPO.PROPORCAO, fonte: "SISAB" },
      { chave: "propGestantesHivCargaIndetectavel", label: "Proporção de gestantes com HIV e carga viral indetectável no parto", tipo: TIPO.PROPORCAO },
      { chave: "propGestantesHivTarv", label: "Proporção de gestantes com HIV em uso de TARV", tipo: TIPO.PROPORCAO },
      { chave: "casosHivUltimos5anos", label: "Casos de HIV registrados nos últimos 5 anos", tipo: TIPO.CONTAGEM },
      { chave: "propPvhaVinculadasTarv", label: "Proporção de PVHA vinculadas que estavam em TARV no ano", tipo: TIPO.PROPORCAO },
      { chave: "propPvhaTarvCargaDetectavel", label: "Proporção de PVHA em TARV com carga viral detectável no ano", tipo: TIPO.PROPORCAO },
      { chave: "covVacinaHepB30dias", label: "Cobertura de vacina de hepatite B até 30 dias após o nascimento", tipo: TIPO.PROPORCAO, fonte: "SISPNI" },
      { chave: "covPentavalente3a", label: "Cobertura de 3ª dose de pentavalente em menores de 1 ano", tipo: TIPO.PROPORCAO, fonte: "SISPNI" },
      { chave: "tratadosHepC", label: "Pessoas tratadas para hepatite C", tipo: TIPO.CONTAGEM, fonte: "SICLOM" },
      { chave: "tratamentoHepB", label: "Pessoas em tratamento para hepatite B", tipo: TIPO.CONTAGEM, fonte: "SICLOM" },
      { chave: "propTbPulmonarConfLabTV", label: "Proporção de casos novos de TB pulmonar com confirmação laboratorial", tipo: TIPO.PROPORCAO, fonte: "Sinan" },
      { chave: "propCulturaEscarroRetratamentoTV", label: "Proporção de cultura de escarro entre casos de retratamento", tipo: TIPO.PROPORCAO, fonte: "Sinan" },
      { chave: "propTestagemHivTb", label: "Proporção de testagem para HIV entre casos novos de TB", tipo: TIPO.PROPORCAO, fonte: "Sinan" },
      { chave: "propContatosTbPulmonarTV", label: "Proporção de contatos examinados de casos novos de TB pulmonar com confirmação laboratorial", tipo: TIPO.PROPORCAO, fonte: "Sinan" },
      { chave: "propCuraTbPulmonarTV", label: "Proporção de cura nos casos novos de TB pulmonar com confirmação laboratorial", tipo: TIPO.PROPORCAO, fonte: "Sinan" },
      { chave: "propInterrupcaoTbPulmonarTV", label: "Proporção de interrupção do tratamento de TB pulmonar com confirmação laboratorial", tipo: TIPO.PROPORCAO, fonte: "Sinan" },
      { chave: "tratamentosPreventivosTb", label: "Tratamentos preventivos de tuberculose iniciados", tipo: TIPO.CONTAGEM, fonte: "IL-TB" },
    ],
  },

  "sifilis-hiv": {
    label: "Sífilis e HIV/AIDS",
    indicadores: [
      { chave: "taxaSifilisCongenitaMenor1", label: "Taxa de incidência de sífilis congênita em menores de 1 ano por 1.000 NV (Sinan)", tipo: TIPO.TAXA, fonte: "Sinan", parametro: "Nota Técnica nº 187/2024" },
      { chave: "taxaDeteccaoSifilisAdquirida", label: "Taxa de detecção de sífilis adquirida por 100.000 hab., 30% acima da média nacional (Sinan)", tipo: TIPO.TAXA, fonte: "Sinan", parametro: "Nota Técnica nº 187/2024" },
      { chave: "testeRapidoSifilisGeral", label: "Testes rápidos de Sífilis na população geral (rede pública, exceto AB e UPA)", tipo: TIPO.CONTAGEM },
      { chave: "testeRapidoSifilisGestante", label: "Testes rápidos de Sífilis em gestantes (rede pública, exceto AB e UPA)", tipo: TIPO.CONTAGEM },
      { chave: "pctSifilisCongenitaSobreGestantes", label: "Percentual de sífilis congênita sobre total de sífilis em gestantes", tipo: TIPO.PROPORCAO, parametro: "PORTARIA GM/MS nº 6.878" },
      { chave: "testeRapidoHospitalRegional", label: "Testes rápidos realizados no Hospital Regional de SJ", tipo: TIPO.CONTAGEM },
      { chave: "testeRapidoAb", label: "Testes rápidos realizados na AB", tipo: TIPO.CONTAGEM },
      { chave: "obitosAids", label: "Óbitos por AIDS", tipo: TIPO.CONTAGEM },
      { chave: "testeRapidoCase", label: "Testes rápidos realizados no CASE", tipo: TIPO.CONTAGEM },
      { chave: "testeRapidoUpaForquilhinhas", label: "Testes rápidos realizados na UPA Forquilhinhas", tipo: TIPO.CONTAGEM },
      { chave: "sifilisCongenitaMenor1", label: "Casos novos de sífilis congênita em menores de 1 ano", tipo: TIPO.CONTAGEM },
      { chave: "sifilisGestantes", label: "Casos novos de sífilis em gestantes", tipo: TIPO.CONTAGEM },
      { chave: "sifilisGeral", label: "Casos novos de sífilis na população geral", tipo: TIPO.CONTAGEM },
      { chave: "obitosSifilisCongenita", label: "Óbitos por sífilis congênita em menores de 1 ano", tipo: TIPO.CONTAGEM },
      { chave: "testeRapidoHiv", label: "Testes rápidos de HIV", tipo: TIPO.CONTAGEM },
      { chave: "pessoasVivendoHiv", label: "Pessoas convivendo com HIV/AIDS no município", tipo: TIPO.CONTAGEM },
      { chave: "aidsCasosNovos", label: "Casos novos de AIDS", tipo: TIPO.CONTAGEM },
      { chave: "aidsCriancasMenor5", label: "Casos novos de AIDS em crianças menores de 5 anos", tipo: TIPO.CONTAGEM },
      { chave: "aidsMaior13", label: "Casos novos de AIDS em maiores de 13 anos", tipo: TIPO.CONTAGEM },
      { chave: "gestantesHivPositivo", label: "Casos novos de gestantes HIV+", tipo: TIPO.CONTAGEM },
      { chave: "hivCasosNovos", label: "Casos novos de HIV+", tipo: TIPO.CONTAGEM },
      { chave: "coefMortAids", label: "Coeficiente de mortalidade por aids por 100.000 hab., 30% acima da média nacional (Sinan)", tipo: TIPO.TAXA, fonte: "Sinan", parametro: "Nota Técnica nº 187/2024" },
      { chave: "taxaDeteccaoAids", label: "Taxa de detecção de aids por 100.000 hab., 30% acima da média nacional (Sinan)", tipo: TIPO.TAXA, fonte: "Sinan", parametro: "Nota Técnica nº 187/2024" },
      { chave: "gestantesHivCadastradas", label: "Casos novos de gestantes HIV/AIDS cadastradas no Programa", tipo: TIPO.CONTAGEM },
      { chave: "gestantesHivPreNatal", label: "Casos novos de gestantes HIV/AIDS diagnosticados no pré-natal", tipo: TIPO.CONTAGEM },
      { chave: "gestantesHivDiagnosticoPrevio", label: "Casos novos de gestantes com diagnóstico prévio de HIV/AIDS", tipo: TIPO.CONTAGEM },
      { chave: "notificacoesHivGestantes", label: "Notificações HIV/AIDS em gestantes realizadas", tipo: TIPO.CONTAGEM },
      { chave: "vdProgramaHivServicoSocial", label: "Visitas domiciliares a pacientes do Programa HIV/AIDS com Serviço Social", tipo: TIPO.CONTAGEM },
      { chave: "criancasExpostasHivTotal", label: "Total de crianças expostas ao HIV no município", tipo: TIPO.CONTAGEM },
      { chave: "criancasExpostasHivNovas", label: "Casos novos de crianças expostas ao HIV no município", tipo: TIPO.CONTAGEM },
      { chave: "criancasExpostasSemSoroconversao", label: "Crianças expostas SEM soroconversão", tipo: TIPO.CONTAGEM },
      { chave: "criancasExpostasComSoroconversao", label: "Crianças expostas COM soroconversão", tipo: TIPO.CONTAGEM },
      { chave: "criancasInfectadasAcompanhamento", label: "Crianças infectadas em acompanhamento (casos antigos)", tipo: TIPO.CONTAGEM },
      { chave: "criancasInfectadasNovas", label: "Casos novos de crianças infectadas no ano", tipo: TIPO.CONTAGEM },
      { chave: "pctAidsCd4Menor200", label: "Percentual de aids com LT-CD4 < 200 cels/mm³ sobre casos novos no SISCEL", tipo: TIPO.PROPORCAO, fonte: "SISCEL", parametro: "PORTARIA GM/MS nº 6.878/2025" },
    ],
  },

  imunizacao: {
    label: "Imunização",
    indicadores: [
      { chave: "propVacinasCalendarioCrianca", label: "Proporção de vacinas do Calendário Básico da Criança com coberturas alcançadas", tipo: TIPO.PROPORCAO },
      { chave: "propVacinasSelecionadasMenor2", label: "Proporção de vacinas selecionadas (< 2 anos): Penta 3ª, Pneumo10 2ª, Pólio 3ª, Tríplice viral 1ª", tipo: TIPO.PROPORCAO },
      { chave: "dtpaGestantes", label: "Dtpa em gestantes", tipo: TIPO.CONTAGEM },
      { chave: "palivizumabeAplicacoes", label: "Total de aplicações do medicamento Palivizumabe", tipo: TIPO.CONTAGEM },
      { chave: "notificacoesEapv", label: "Notificações de eventos adversos pós-vacina", tipo: TIPO.CONTAGEM },
      { chave: "solicitacoesImunobiologicos", label: "Solicitações de imunobiológicos especiais", tipo: TIPO.CONTAGEM },
      { chave: "propPrevineBrasilPolioPenta", label: "Proporção (Previne Brasil): Pólio 3ª e Penta 3ª com cobertura preconizada", tipo: TIPO.PROPORCAO },
      { chave: "autorizacoesImunobiologicos", label: "Autorizações de imunobiológicos especiais", tipo: TIPO.CONTAGEM },
      { chave: "covVacinalHpv9a14", label: "Cobertura vacinal de adolescentes de 9 a 14 anos — HPV", tipo: TIPO.PROPORCAO },
      { chave: "propSalasVacinaCnesPqavs", label: "(PQA-VS) Proporção de salas de vacina ativas no CNES informando mensalmente", tipo: TIPO.PROPORCAO, parametro: "PQA-VS" },
    ],
  },
};

const BLOCOS = Object.entries(VIGILANCIA_INDICADORES).map(([value, { label }]) => ({
  value,
  label,
}));

const ANO_ATUAL = new Date().getFullYear();

// ─── Derivations from the catalog ─────────────────────────────────────────────

/** indicadores[] for a bloco; [] if unknown. */
function indicadoresDe(bloco) {
  return VIGILANCIA_INDICADORES[bloco]?.indicadores ?? [];
}

/** { chave: null } seed for a bloco — blank ≠ 0. */
function valoresZerados(bloco) {
  return Object.fromEntries(indicadoresDe(bloco).map(({ chave }) => [chave, null]));
}

// ─── Schema ───────────────────────────────────────────────────────────────────

/**
 * `valores` is validated as a record of chave → (Number | null).
 * The per-bloco key set is enforced at submit time by buildDocumento, which
 * whitelists only catalog-defined chaves for the active bloco (firewall).
 */
const valorSchema = z
  .union([z.coerce.number(), z.literal(""), z.null()])
  .transform((v) => (v === "" || v === null ? null : v))
  .refine((v) => v === null || v >= 0, "Valor não pode ser negativo");

const vigilanciaSchema = z.object({
  bloco: z.enum(Object.keys(VIGILANCIA_INDICADORES)),
  competencia: z.object({
    ano: z.coerce.number().int().min(2000).max(2100),
    mes: z.enum(MESES),
  }),
  valores: z.record(z.string(), valorSchema),
});

// ─── Utils ────────────────────────────────────────────────────────────────────

function formatValor(valor, tipo) {
  if (valor === null || valor === undefined || valor === "") return "—";
  const n = Number(valor);
  if (Number.isNaN(n)) return "—";
  if (tipo === TIPO.PROPORCAO) {
    return n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";
  }
  if (tipo === TIPO.TAXA) {
    return n.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
  }
  return n.toLocaleString("pt-BR");
}

/**
 * Firewall: produces the persisted document. Only catalog-defined chaves for
 * the active bloco survive; meta/parametro/fonte are dropped here.
 * Shape: { bloco, competencia: { ano, mes }, indicadores: [{ chave, valor }] }
 */
function buildDocumento(values) {
  const catalogo = indicadoresDe(values.bloco);
  const indicadores = catalogo.map(({ chave }) => {
    const raw = values.valores?.[chave];
    const valor = raw === "" || raw === undefined || raw === null ? null : Number(raw);
    return { chave, valor };
  });
  return {
    bloco: values.bloco,
    competencia: { ano: values.competencia.ano, mes: values.competencia.mes },
    indicadores,
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const DEFAULT_BLOCO = BLOCOS[0].value;

const DEFAULT_VALUES = {
  bloco: DEFAULT_BLOCO,
  competencia: { ano: ANO_ATUAL, mes: "" },
  valores: valoresZerados(DEFAULT_BLOCO),
};

function useVigilanciaForm(onSuccess) {
  const form = useForm({
    resolver: zodResolver(vigilanciaSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
  });

  const bloco = useWatch({ control: form.control, name: "bloco" });
  const valores = useWatch({ control: form.control, name: "valores" });

  // Re-seed valores on bloco change → prevents cross-bloco data leakage.
  useEffect(() => {
    form.setValue("valores", valoresZerados(bloco), {
      shouldValidate: false,
      shouldDirty: false,
    });
  }, [bloco, form]);

  const catalogo = useMemo(() => indicadoresDe(bloco), [bloco]);

  const preenchidos = useMemo(
    () =>
      catalogo.reduce((acc, { chave }) => {
        const v = valores?.[chave];
        return acc + (v === "" || v === undefined || v === null ? 0 : 1);
      }, 0),
    [catalogo, valores],
  );

  const handleSubmit = form.handleSubmit(
    useCallback(
      (data) => {
        onSuccess(buildDocumento(data));
        form.reset({
          ...DEFAULT_VALUES,
          bloco: data.bloco,
          competencia: { ...data.competencia, mes: "" },
          valores: valoresZerados(data.bloco),
        });
      },
      [form, onSuccess],
    ),
  );

  return { form, handleSubmit, bloco, catalogo, preenchidos };
}

// ─── Shared sub-components (mirror app/shared) ─────────────────────────────────

function FormField({ label, error, children, htmlFor }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function fieldCls(hasError) {
  return [
    "w-full rounded-md border px-3 py-2 text-sm text-gray-900",
    "placeholder:text-gray-400 bg-white",
    "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400",
    "transition-colors duration-150",
    hasError
      ? "border-red-300 focus:ring-red-500/30 focus:border-red-400"
      : "border-gray-300",
  ].join(" ");
}

function MetricCard({ label, value, accent = false }) {
  return (
    <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-2xl font-semibold tabular-nums ${accent ? "text-blue-600" : "text-gray-800"}`}>
        {value}
      </p>
    </div>
  );
}

const TIPO_BADGE = {
  [TIPO.CONTAGEM]: { label: "nº", cls: "bg-gray-100 text-gray-500" },
  [TIPO.PROPORCAO]: { label: "%", cls: "bg-blue-50 text-blue-600" },
  [TIPO.TAXA]: { label: "taxa", cls: "bg-violet-50 text-violet-600" },
};

// ─── Feature components (mirror feature/components) ────────────────────────────

function BlocoSelect({ register, error }) {
  return (
    <FormField label="Bloco / Eixo de Vigilância" error={error} htmlFor="bloco">
      <select id="bloco" {...register("bloco")} className={fieldCls(!!error)}>
        {BLOCOS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FormField>
  );
}

function IndicadorGrid({ catalogo, control, errors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
      {catalogo.map(({ chave, label, tipo, meta, parametro, fonte }) => {
        const fieldError = errors.valores?.[chave];
        const badge = TIPO_BADGE[tipo];
        const helper = [fonte && `Fonte: ${fonte}`, parametro, meta && `Meta: ${meta}`]
          .filter(Boolean)
          .join(" · ");

        return (
          <div key={chave} className="flex flex-col">
            <label
              htmlFor={`valores.${chave}`}
              className="flex items-start gap-2 text-sm font-medium text-gray-700 mb-1"
            >
              <span
                className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badge.cls}`}
              >
                {badge.label}
              </span>
              <span className="leading-snug">{label}</span>
            </label>

            <Controller
              name={`valores.${chave}`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  value={field.value ?? ""}
                  id={`valores.${chave}`}
                  type="number"
                  min={0}
                  step={tipo === TIPO.CONTAGEM ? 1 : "any"}
                  inputMode={tipo === TIPO.CONTAGEM ? "numeric" : "decimal"}
                  placeholder={tipo === TIPO.PROPORCAO ? "% (em branco = não reportado)" : "em branco = não reportado"}
                  className={fieldCls(!!fieldError)}
                  onChange={(e) =>
                    field.onChange(e.target.value === "" ? null : Number(e.target.value))
                  }
                />
              )}
            />

            {helper && <p className="text-[11px] text-gray-400 mt-1">{helper}</p>}
            {fieldError && <p className="text-xs text-red-500 mt-1">{fieldError.message}</p>}
          </div>
        );
      })}
    </div>
  );
}

function RegistrosList({ registros }) {
  if (registros.length === 0) return null;

  return (
    <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Registros da sessão</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {["Competência", "Bloco", "Preenchidos", "Indicadores"].map((h, i) => (
              <th
                key={h}
                className={`text-xs font-medium text-gray-400 py-2 pr-4 whitespace-nowrap ${
                  i >= 2 ? "text-right" : "text-left"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {registros.map((r) => {
            const preenchidos = r.indicadores.filter((i) => i.valor !== null).length;
            return (
              <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-2.5 pr-4 text-gray-500 whitespace-nowrap">
                  {r.competencia.mes}/{r.competencia.ano}
                </td>
                <td className="py-2.5 pr-4 text-gray-800">
                  {VIGILANCIA_INDICADORES[r.bloco]?.label ?? r.bloco}
                </td>
                <td className="py-2.5 pr-4 text-right font-medium text-gray-800 tabular-nums">
                  {preenchidos}/{r.indicadores.length}
                </td>
                <td className="py-2.5 text-right text-gray-500 tabular-nums">
                  {r.indicadores.length}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function VigilanciaForm({ onSuccess }) {
  const { form, handleSubmit, catalogo, preenchidos } = useVigilanciaForm(onSuccess);
  const {
    register,
    control,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="border border-gray-300 rounded-xl p-8 bg-white shadow-sm space-y-8">
        {/* ── Competência ────────────────────────────────────── */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Competência</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlocoSelect register={register} error={errors.bloco?.message} />

            <FormField label="Mês de Referência" error={errors.competencia?.mes?.message} htmlFor="mes">
              <select
                id="mes"
                {...register("competencia.mes")}
                className={fieldCls(!!errors.competencia?.mes)}
              >
                <option value="">Selecione o mês</option>
                {MESES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Ano" error={errors.competencia?.ano?.message} htmlFor="ano">
              <input
                id="ano"
                type="number"
                min={2000}
                max={2100}
                {...register("competencia.ano")}
                className={fieldCls(!!errors.competencia?.ano) + " text-center"}
              />
            </FormField>
          </div>
        </div>

        {/* ── Indicadores ────────────────────────────────────── */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Indicadores do Bloco</h2>
            <span className="text-sm text-gray-400 tabular-nums">
              {preenchidos}/{catalogo.length} preenchidos
            </span>
          </div>

          <IndicadorGrid catalogo={catalogo} control={control} errors={errors} />

          <div className="grid grid-cols-2 gap-3 mt-8">
            <MetricCard label="Indicadores no bloco" value={String(catalogo.length)} />
            <MetricCard label="Preenchidos" value={String(preenchidos)} accent />
          </div>
        </div>

        {/* ── Actions ────────────────────────────────────────── */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => form.reset()}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5
                       text-sm font-medium text-gray-600
                       hover:bg-gray-50 active:scale-[0.98]
                       focus:outline-none focus:ring-2 focus:ring-gray-300
                       transition-all duration-150 cursor-pointer"
          >
            Limpar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5
                       text-sm font-medium text-white
                       hover:bg-blue-700 active:scale-[0.98]
                       focus:outline-none focus:ring-2 focus:ring-blue-500/40
                       transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Registrar
          </button>
        </div>
      </div>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VIEPFormUI() {
  const [registros, setRegistros] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = useCallback((documento) => {
    setRegistros((prev) => [{ ...documento, id: crypto.randomUUID() }, ...prev]);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen">
      {/* navbar */}
      <GNavbar />
      {/* page-title-starts */}
      <section className="px-10 py-10">
        <div className="border-b border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-gray-900">Formulário de Entrada de Dados</h1>
          <p className="text-gray-500 text-sm mt-1">
            VIEP — Indicadores mensais
          </p>
        </div>
      </section>

      {/* form-starts */}
      <section className="px-10 pb-10 space-y-6">
        {showSuccess && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-lg bg-green-50 border border-green-200 px-4 py-3
                       text-sm font-medium text-green-700 flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity=".4" />
              <path
                d="M4.5 8.5L7 11L11.5 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Competência registrada com sucesso.
          </div>
        )}

        <VigilanciaForm onSuccess={handleSuccess} />
        <RegistrosList registros={registros} />
      </section>

      {/* footer-starts */}
      <section>
        <Footer />
      </section>
    </main>
  );
}