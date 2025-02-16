import { TextField } from '@mui/material';
import React, { useEffect, useImperativeHandle, useRef } from 'react';

const GooglePlacesInput = (props, ref) => {
  const autoCompleteRef = useRef();
  const inputRef = useRef();

  const options = {
    componentRestrictions: { country: 'ca' },
    fields: ['address_components'],
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, options);
    autoCompleteRef.current.addListener('place_changed', async function () {
      const place = await autoCompleteRef.current.getPlace();
      props.setAddress(place);
    });
  }, []);

  useImperativeHandle(ref, () => ({
    updateAddress: (address) => {
      updateAddress(address);
    },
  }));

  const updateAddress = (address) => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = address;
    }
  };

  return (
    <div>
      <TextField
        inputProps={{ type: 'text' }}
        required
        InputLabelProps={{ shrink: true }}
        disabled={!props.editable}
        label='Search Address'
        inputRef={inputRef}
        fullWidth
        variant='standard'
        InputProps={{
          zIndex: 999,
          placeholder: '',
          autoFocus: props.editable,
        }}
      />
    </div>
  );
};

export default React.forwardRef(GooglePlacesInput);
