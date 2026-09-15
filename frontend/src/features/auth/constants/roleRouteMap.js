import { ROUTES } from "../../../app/routing/routes.constants"

export const ROLE_TO_ROUTE = {
  "admin": ROUTES.ADMIN_HOME_UI,
  "gestor(a)": ROUTES.ADMINISTRATIVE_MANAGEMENT_DEPTO_HOME_UI,
  "diretor(a)": ROUTES.ADMINISTRATIVE_MANAGEMENT_DEPTO_HOME_UI,
  "medico(a)": ROUTES.PRIMARY_ATTENTION_HOME_UI,
}