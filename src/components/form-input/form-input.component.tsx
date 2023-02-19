import React, {FC, InputHTMLAttributes} from "react";
import "./form-input.styles";
import {FormInputLabel, Group, Input} from "./form-input.styles";

export type FormInputProps = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>
const FormInput: FC<FormInputProps> = ({label, ...otherProps}) => {
    return (
        <Group>
            <Input required {...otherProps} />
            {label && (
                <FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value === "string" &&
                    otherProps.value.length)}>{label}</FormInputLabel>
            )}
        </Group>
    );
};

export default FormInput;
