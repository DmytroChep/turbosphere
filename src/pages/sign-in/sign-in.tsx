import { useForm } from "react-hook-form"
import type { ISignInForm } from "./sign-in.types"
import styles from "./sign-in.module.css"
import { ICONS } from "../../shared";
import { useUserContext } from "../../context/user-context";
import { useNavigate } from "react-router-dom";

export function SignIn(){
    const {handleSubmit, register, formState: {errors}, setError} = useForm<ISignInForm>()
    const { login } = useUserContext()

    const navigate = useNavigate() 


    async function onSubmit(data:ISignInForm){
        const result = await login(data)
        if (result) {
            setError("root", {message: result})
        }
    }
    const emailError = errors.email?.message 
    const rootError = errors.root?.message

    
    
    return(<div className={styles.signInDiv}> <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.signInForm}>
            <label className={styles.signInLabel}>
                Email:
                <input className={styles.signInInput} type="email" {...register("email", {
                    required: {
                        value: true,
                        message: "This field is required"
                    },
                    minLength: {
                        value: 7,
                        message: "email lenght must be at least 7 symbols"
                    },
                    validate: (value) => {
                        if (!value.includes(".") || !value.includes("@")){
                            return "Email must have @ and ."
                        }
                    }


                    
                })} />
                {emailError && <p className={styles.error}>{emailError}</p>}
            </label>
            <label className={styles.signInLabel}>Password:
                            <input className={styles.signInInput} type="password" {...register("password", {
                    required: {
                        value: true,
                        message: "This field is required"
                    },
                    minLength:{
                        value:5,
                        message:"Password length must be at least 8 symbols"
                    }
            })}/>
            </label>
            <p className={styles.sigInRegistration}>Don`t have an acount? <a href="/sign-up" className= {styles.signUpLink}>Register now</a></p>
            <button className={styles.signInSentButton} type="submit">Submit</button>
            
            {rootError && <p className={styles.error}>{rootError}</p>}
            
        </form>
        <ICONS.SignInIcon className={styles.SignInImage} />
        </div>
       
    )
}