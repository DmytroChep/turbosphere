import { useForm } from "react-hook-form"
import type { ISignUpForm } from "./sign-up.types"
import styles from "./sign-up.module.css"
import { ICONS } from "../../shared"
import { Link } from "react-router-dom"
import { useUserContext } from "../../context/user-context"

export function SignUp() {
    const {handleSubmit, register, formState: {errors}} = useForm<ISignUpForm>()
    const {registration} = useUserContext()

    const emailError = errors.email?.message
    const passwordError = errors.password?.message
    const usernameError = errors.username?.message
    const avatarError = errors.avatar?.message

    const rootError = errors.root?.message

    function onSubmit(data:ISignUpForm){
        registration(data)
    }

    return (
        <div className={styles.formAndImage}>
            
            <form  noValidate className={styles.signUpForm} onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email" className={styles.inputLabel}>
                    Email:
                    <input type="email"  className={styles.inputForm} {...register('email', {
                        required: {
                            value: true,
                            message: "This field is required"
                        },
                        minLength: {
                            value: 5,
                            message: "Email length must be more than 5 symbols"
                        },
                        validate: (value) => {
                            if (!value.includes(".") || !value.includes("@")){
                                return "Email must contain @ and ."
                            }
                        }
                    })}
                    />
                    {emailError && <p className={styles.error}>{emailError}</p>}
                </label>
    
                <label htmlFor="username" className={styles.inputLabel}>
                    Username:
                    <input type="text" className={styles.inputForm} {...register('username', {
                        required: {
                            value: true,
                            message: "This field is required"
                        },
                        minLength: {
                            value: 5,
                            message: "Username length must be more than 5 symbols"
                        },
                        validate: (value) => {
                            if (value.includes("!") || value.includes(".")){
                                return "Username can't contain ! or ."
                            }
                        }
                    })}
                    />
                    {usernameError && <p className={styles.error}>{usernameError}</p>}
                </label>
    
                <label htmlFor="password" className={styles.inputLabel}>
                    Password:
                    <input type="password" className={styles.inputForm} {...register('password', {
                        required: {
                            value: true,
                            message: "This field is required"
                        },
                        minLength: {
                            value: 5,
                            message: "Password length must be more than 5 symbols"
                        },
                        validate: (value) => {
                            if (value.includes("!") || value.includes(".") || value.includes("*")){
                                return "Password can't contain any extra symbols"
                            } else if (typeof value !== 'string') {
                                return "Password must contain only letters or numbers"
                            }
                        }
                    })}
                    />
                    {passwordError && <p className={styles.error}>{passwordError}</p>}
                </label>
    
                <label htmlFor="avatar" className={styles.inputLabel}>
                    Avatar:
                    <input type="text" className={styles.inputForm} {...register('avatar', {
                        required: {
                            value: true,
                            message: "This field is required"
                        },
                        minLength: {
                            value: 5,
                            message: "Password length must be more than 5 symbols"
                        },
                        validate: (value) => {
                            if (!value.includes("https://") && !value.includes("http://") && !value.includes("://")){
                                return "Avatar must be a valid url"
                            } else if (typeof value !== 'string') {
                                return "Url must be string"
                            }
                        }
                    })}
                    />
                    {avatarError && <p className={styles.error}>{avatarError}</p>}
                </label>
    
                <p className={styles.signInInfo}>Already have an account? <span ><Link to='/sign-in' className={styles.signUpInfoLink}>Sign in now!</Link></span></p>
    
                <button className={styles.signUpSentButton} type="submit">Submit</button>
                {rootError && <p className={styles.error}>{rootError}</p>}
            </form>
            <ICONS.SignUpIcon className={styles.signUpIcon} />
        </div>
    )
}