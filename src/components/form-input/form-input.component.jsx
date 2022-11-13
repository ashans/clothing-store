import React from "react";
import "./form-input.styles";
import {FormInputLabel, Group, Input} from "./form-input.styles";

const FormInput = ({label, ...otherProps}) => {
    return (
        <Group>
            <Input required {...otherProps} />
            {label && (
                <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
            )}
        </Group>
    );
};

export default FormInput;
