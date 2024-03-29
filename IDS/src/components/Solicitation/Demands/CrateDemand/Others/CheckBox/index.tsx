import { useTranslation } from "react-i18next";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLabels() {
  const { t } = useTranslation();

  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label={t("yes")} />
    </FormGroup>
  );
}