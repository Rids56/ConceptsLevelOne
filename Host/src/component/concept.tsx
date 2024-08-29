import { joiResolver } from "@hookform/resolvers/joi";
import { Box, Button, TextField } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Joi from "joi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

//Common api create
interface UseApiOptions {
    method: string,
    headers?: HeadersInit,
    body?: BodyInit | null,
}

interface ApiState<T> {
    data: T | null,
    error: string | null,
    isLoading: boolean,
}

export const fetchCommonApi = <T extends unknown>(url: string, options?: UseApiOptions): ApiState<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = (async() => {
        setIsLoading(true);

        try {
            const response = await fetch(url, options);

            if(!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            
            const result = await response.json();
            setData(result);            
        } catch (error: any) {
            setError(error.message);            
        } finally {
            setIsLoading(false);
        }
    })

    useEffect(() => {
        fetchData();
    }, [url, options]);

    return { data, error, isLoading};
}
//Common api create

//Authenticate & ReactHookForm with validation
interface ForamData {
    name: string,
    password: string,
}

const test = () => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required().messages({
            'string.empty': 'Name is reuired',
        }),
        password: Joi.string().min(6).required().messages({
            'string.empty': 'Password required',
            'string.min': 'Minimun 6 character required'
        })
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(schema),
    })

    const handleSubmitForm = (data: ForamData) => {
        console.log("data", data.name, data.password);    
    }

    return (
        <div>
            <Box
            component="form"
            onSubmit={handleSubmit(handleSubmitForm)}
            >
                <TextField
                    required
                    {...register("name")}
                    id="name"
                    label="Name"
                />
                {errors.name && errors.name.message && (
                    <span className="error">{errors.name.message}</span>
                )}

                <TextField
                    required
                    {...register("password")}
                    // {...register('password', { required: 'Password is required' })}  // without validation library
                    id="password"
                    label="Password"
                />
                {errors.password && errors.password.message && (
                    <span className="error">{errors.password.message}</span>
                )}

                <Button type="submit">
                    Submit
                </Button>
            </Box>
        </div>
    )

}
//Authenticate & ReactHookForm with validation


// basic reducer
interface User {
    name: string,
    password: string,
}

interface UserState {
    users: User[];
}

const initialState: UserState ={
    users: []
}

export const slice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addReducer: (state, action: PayloadAction<User>) => {
            state.users.push({
                name: action.payload.name,
                password: action.payload.password,
            })
        },
        updateReducer: (state, action) => {
            const { name, password } = action.payload;
            const index = state.users.findIndex(
                (user) => user.name === name
            );

            if(index !== -1) {
                state.users[index] = { ...state.users[index], name, password}
            }           
        },
        deleteReducer: (state, action) => {
            const name = action.payload.name;
            state.users = state.users?.filter((e) => e.name != name);
        }
    }
})
// basic reducer



export default test;