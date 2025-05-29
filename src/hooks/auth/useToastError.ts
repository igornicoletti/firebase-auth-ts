import { getFirebaseErrorMessage } from "@/utils"
import { FirebaseError } from "firebase/app" // Importe o tipo de erro genérico do Firebase
import { toast } from 'sonner'

// Hook personalizado para exibir mensagens de erro do Firebase usando toast
export const useToastError = () => {

  const showFirebaseError = (err: unknown) => {
    // Verifica se o erro é uma instância de FirebaseError
    if (err instanceof FirebaseError) {
      const { code } = err // Obtém o código do erro FirebaseError
      const errorMessage = getFirebaseErrorMessage(code) // Usa a função para obter a mensagem amigável

      toast(errorMessage.title, {
        description: errorMessage.message,
      })
    } else if (err instanceof Error) {
      // Para outros tipos de erros JavaScript
      toast("Application Error", {
        description: err.message || "An unexpected error occurred.",
      })
    } else {
      // Para erros de tipo desconhecido
      toast("Unknown Error", {
        description: "An unknown error occurred. Please try again.",
      })
    }
  }

  return { showFirebaseError }
}
