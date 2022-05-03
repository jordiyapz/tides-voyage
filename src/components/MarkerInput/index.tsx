import { Autocomplete, Button, Stack, TextField } from "@mui/material";
import { Form, Formik, FormikConfig } from "formik";
import { Marker } from "../../types";
import { markerDict } from "../../utils/marker";

type MarkerInputProps = {
  onSubmit: (values: Partial<Marker>) => void;
};

const MarkerInput = ({ onSubmit }: MarkerInputProps) => {
  const formikSetup: FormikConfig<Partial<Marker>> = {
    initialValues: { type: "chest-common", x: undefined, y: undefined },
    onSubmit,
  };
  const options = Object.values(markerDict);

  return (
    <Formik {...formikSetup}>
      {(formik) => (
        <Form>
          <Stack direction="column" spacing={1}>
            <Autocomplete
              disablePortal
              options={options}
              defaultValue={options[0]}
              renderInput={(params) => (
                <TextField {...params} size="small" label="Type" />
              )}
              onChange={(e, val) => {
                formik.setFieldValue("type", val?.id, true);
              }}
            />
            <TextField
              variant="outlined"
              label="Coord"
              placeholder="0, 0"
              error={!!(formik.errors.x || formik.errors.y)}
              helperText={formik.errors.x || formik.errors.y}
              onChange={(e) => {
                let values: number[] | string[] = e.target.value.split(",");
                if (values.length < 2)
                  return formik.setFieldError(
                    "x",
                    "Must be separated by commas"
                  );
                values = values.map((v) => Number(v.trim()));
                formik.setFieldValue("x", values[0]);
                formik.setFieldValue("y", values[1]);
              }}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default MarkerInput;
