// Transforms flat Zustand form state into the nested document
// shape expected by the backend API contract.

const toDateOrNull = (value) => {
  if (!value) return null;
  const parsed = new Date(value);
  return isNaN(parsed) ? null : parsed.toISOString();
};

const trim = (value) =>
  typeof value === "string" ? value.trim() || null : value ?? null;

export const formToDocument = (formData) => {
  if (!formData) return {};
  const d = formData;

  return {
    unitIdentification: {
      ubs: trim(d.ubs),
      pregnantName: trim(d.pregnantName),
      notificationNumber: d.notificationNumber
        ? Number(d.notificationNumber)
        : null,
    },
    dates: {
      notificationDate: toDateOrNull(d.notificationDate),
      birthDate: toDateOrNull(d.birthDate),
      testDate: toDateOrNull(d.testDate),
      doseDate: toDateOrNull(d.doseDate),
    },
    clinical: {
      notificationTrimester: trim(d.notificationTrimester),
      clinicStage: trim(d.clinicStage),
      therapeuticScheme: trim(d.therapeuticScheme),
      penicillinAllergy: trim(d.penicillinAllergy),
    },
    sinan: {
      doSinan: trim(d.doSinan),
      sinanType: trim(d.sinanType),
      vdrlDate: toDateOrNull(d.vdrlDate),
      vdrlValue: trim(d.vdrlValue),
      observations: trim(d.observations),
    },
    personalData: {
      cns: trim(d.cns),
      motherName: trim(d.motherName),
      illness: trim(d.illness),
      gestationalAge: trim(d.gestationalAge),
      race: trim(d.race),
      education: trim(d.education),
      address: trim(d.address),
      neighborhood: trim(d.neighborhood),
      phone: trim(d.phone),
      workerIdentification: trim(d.workerIdentification),
    },
  };
};