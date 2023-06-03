"use client"
import { useState } from "react"

import { NewForm } from "@/models/form"
import TextField from "@/components/TextField"
import Select from "@/components/Select"
import ConfirmationPanel from "@/components/ConfirmationPanel"

import { useForm, useCountries } from "@/hooks"

export default function CreateFormPage() {
  const [submitted, setSubmitted] = useState(false)
  const { countries } = useCountries()

  const initialState = {
    fullname: "",
    country: ""
  }

  const rules = {
    fullname: [
      (value: string) => !!value || "Este campo es requerido",
      (value: string) => (value.length >= 2 && value.length <= 50) || "Debe tener entre 2-50 caracteres",
      (value: string) => /^([a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+\s?)+$/.test(value) || "Debe ingresar un nombre válido"
    ],
    country: [
      (value: string) => !!value || "Este campo es requerido",
      (value: string) => (value.length >= 4 && value.length <= 30) || "Debe tener entre 2-30 caracteres"
    ]
  }

  const onSubmit = async () => {
    setSubmitted(true)
  }

  const {
    state,
    status,
    errors,
    handleChange,
    handleSubmit
  } = useForm<NewForm>({ initialState, rules, onSubmit })

  return (
    <div className="max-w-sm md:max-w-md">
      {
        !submitted
          ?
          <>
            <h1 className="my-6 text-6xl bg-gradient-to-r from-purple-500 from-10% via-indigo-300 via-30% to-emerald-400 to-90% bg-clip-text text-transparent">
              Simple Form
            </h1>
            <p className="my-3 text-gray-500">
              Este es un simple formulario, donde ingresas tu nombre completo y país.
            </p>
            <form
              id="create-form"
              className="flex flex-col gap-2 justify-center items-start md:flex-row md:gap-6"
              onSubmit={handleSubmit}
            >
              <TextField
                required
                name="fullname"
                value={state.fullname}
                label="Nombre completo"
                placeholder="Ej: John Titor"
                error={errors.fullname}
                onChange={handleChange}
              />

              <Select
                required
                name="country"
                value={state.country}
                items={countries.map(country => ({ label: country.name, emoji: country.flag }))}
                label="País"
                placeholder="Seleccione un país"
                error={errors.country}
                onChange={handleChange}
              />
            </form>
            <button
              type="submit"
              form="create-form"
              disabled={status === "LOADING"}
              className="mt-4 w-full rounded-md flex justify-center items-center gap-2 bg-purple-600 text-zinc-50 p-2 disabled:cursor-not-allowed"
            >
              {
                status !== "LOADING"
                  ? "Guardar"
                  : <>
                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-r-transparent"></span>
                    <span>Guardando...</span>
                  </>
              }
            </button>
          </>
        :
        <ConfirmationPanel 
          message="¡Muchas gracias por realizar el formulario! La información ha sido guardada"
          confirm={() => { setSubmitted(false) } }
        />
      }

    </div>
  )
}