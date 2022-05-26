import react, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { breedList } from 'src/utils';
import { observer } from 'mobx-react-lite'
import { autocompleteDogList } from 'src/states/dogStates';

const filter = createFilterOptions();

export default observer((edit) => {
    let isEdit = edit.edit
    const [value, setValue] = useState(
        isEdit.edit ? { label: isEdit.val } : null
    );
    const reBreedList = breedList().map(x => ({
        label: x.name,
        value: x.name
    }))

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                    setValue({
                        label: newValue,
                    });
                    autocompleteDogList.setBreed(newValue)
                } else if (newValue && newValue.inputValue) {
                    setValue({
                        label: newValue.inputValue,
                    });
                    autocompleteDogList.setBreed(newValue.inputValue)
                } else {
                    setValue(newValue);
                    newValue !== null && autocompleteDogList.setBreed(newValue.label)
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                const { inputValue } = params;
                const isExisting = options.some((option) => inputValue === option.label);
                if (inputValue !== '' && !isExisting) {
                    filtered.push({
                        inputValue,
                        label: `Add "${inputValue}"`,
                    });
                }

                return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={reBreedList}
            getOptionLabel={(option) => {
                if (typeof option === 'string') {
                    return option;
                }
                if (option.inputValue) {
                    return option.inputValue;
                }
                return option.label;
            }}
            renderOption={(props, option) => <li {...props}>{option.label}</li>}
            sx={{ width: '100%' }}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label="Breed" />
            )}
        />
    );
})