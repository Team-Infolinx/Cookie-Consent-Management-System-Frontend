import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const BannerSelectBox = (props) => {
  const { name, fun, items, width, defaultValue } = props;

  return (
    <div className="Select-Box">
      <FormControl sx={{ m: 1, minWidth: { width } }}>
        <InputLabel id={name}>{name}</InputLabel>
        <Select
          value={defaultValue}
          label={name}
          onChange={(e) => fun(e.target.value)}
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

export default BannerSelectBox;
