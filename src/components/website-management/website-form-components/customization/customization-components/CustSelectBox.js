import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const CustSelectBox = (props) =>{
        const {name,fun,items} = props;
    return(
        <div className="Select-Box">
            <FormControl fullWidth>
                <InputLabel id={name}>{name}</InputLabel>
                <Select
                    label={name}
                    onChange={fun}
                >
                    {items.map((item) =>
                        <MenuItem value={item.value}>{item.value}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    );

}

export default CustSelectBox;