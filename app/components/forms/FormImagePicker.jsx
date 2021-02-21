import React, { useEffect } from "react";
import { useFormikContext } from "formik";

import ImageInputList from "../ImageInputList";
import ErrorMessage from "./ErrorMessage";

const storageServer = "https://abdelrahman.ddns.net";

function FormImagePicker({ name, value }) {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  useEffect(
    _ => {
      if (value)
        setFieldValue(
          name,
          value.map(img => `${storageServer}/${img}`)
        );
    },
    [value]
  );

  const handleAdd = uri => {
    console.log("handleADD URI IS ", uri);
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = uri => {
    setFieldValue(
      name,
      imageUris.filter(imageUri => imageUri != uri)
    );
  };

  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage errors={errors[name]} visible={touched[name]} />
    </>
  );
}

export default FormImagePicker;
