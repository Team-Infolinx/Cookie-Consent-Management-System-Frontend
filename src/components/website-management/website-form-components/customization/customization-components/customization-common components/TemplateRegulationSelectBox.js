import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
const TemplateRegulationSelectBox = (props) => {
  const { name, fun, items, width, selectedTemplate } = props;

  return (
    <div className="Select-Box">
      <FormControl sx={{ m: 1, minWidth: { width } }}>
        <InputLabel id={name}>{name}</InputLabel>
        <Select
          label={name}
          onChange={fun}
          value={selectedTemplate?.templateRegulation || ""}
        >
          {items.map((item) => (
            <MenuItem key={item.id} value={item.value}>

              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};



export default TemplateRegulationSelectBox;
