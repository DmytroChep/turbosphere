import { IModalProps } from "./modal.types"
import styles from "./modal.module.css"
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

export function Modal(props: IModalProps) {
    const { children, className, isOpen, onClose, doCloseOnOutsideClick, container = document.body} = props

    const modalRef = useRef<HTMLDivElement>(null)

    
    useEffect(() => {

        if (!doCloseOnOutsideClick) return

        function clickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement

            if (!modalRef.current?.contains(target)) {
                onClose()
            }
        }
        document.body.addEventListener("click", clickOutside)
        return () => document.body.removeEventListener("click", clickOutside)
    }, [doCloseOnOutsideClick, onClose])

    if (!isOpen) {
        return null
    }

    return createPortal(
        <div className={`${className} ${styles.modal}`} ref={modalRef}>

            {children}
        </div>,
        container

    )
}