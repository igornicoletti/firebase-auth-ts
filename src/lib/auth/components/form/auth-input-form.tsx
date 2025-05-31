// src/lib/auth/components/form/auth-input-form.tsx

// Importa hook do React para gerenciar estado local (usado para visibilidade da senha)
import { useState } from 'react'
// Importa tipos específicos do react-hook-form para tipagem segura das props que conectam o input ao formulário
import type { Control, FieldValues, Path } from 'react-hook-form'

// Importa ícones para alternar a visibilidade da senha
import { Eye, EyeClosed } from '@phosphor-icons/react'

// Importa componentes de UI (botão, componentes de formulário wrapper, input nativo)
import { Button } from '@/components/ui/button'
// Componentes de wrapper do react-hook-form, presumivelmente de uma biblioteca de UI como shadcn/ui,
// usados para estruturar o campo do formulário e exibir mensagens de erro.
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

/**
 * Define as props esperadas pelo componente AuthInputForm.
 * Utiliza generics para inferir e manter a segurança de tipos do react-hook-form.
 *
 * @template T - O tipo do objeto de dados completo do formulário (inferido pelo Zod schema, por exemplo).
 */
type AuthInput<T extends FieldValues> = {
  /**
   * O nome do campo específico dentro do objeto de dados do formulário.
   * Define qual parte do formulário este input representa (ex: 'email', 'password').
   * O tipo Path<T> garante que o nome do campo é uma chave válida do tipo de dados do formulário T.
   */
  name: Path<T>
  /**
   * O objeto de controle retornado pelo hook useForm() do react-hook-form.
   * Essencial para conectar este componente de input customizado ao estado global do formulário e
   * ao sistema de registro e validação do react-hook-form.
   */
  control: Control<T>
  /**
   * O tipo padrão do input HTML (ex: 'text', 'email', 'password').
   * Usado para semântica do input e para decidir se um toggle de visibilidade de senha é necessário.
   */
  type: string
  /**
   * Opcional. O texto placeholder a ser exibido dentro do input quando vazio.
   */
  placeholder?: string
  /**
   * Opcional. Um booleano que, se true, desabilita o input e o botão de toggle (se houver).
   * Geralmente usado quando o formulário está em estado de carregamento/submissão.
   */
  disabled?: boolean
}

/**
 * Componente de Input de Formulário Genérico e Reutilizável, Integrado com react-hook-form.
 * Este componente abstrai a renderização de um input de formulário individual,
 * lida com a conexão necessária com o react-hook-form via FormField,
 * e inclui lógica opcional para um toggle de visibilidade em campos de senha.
 * Ele é projetado para ser usado dentro de um componente <Form> ou similar que fornece o contexto necessário do react-hook-form.
 *
 * @template T - O tipo do objeto de dados completo do formulário (inferido pelo Zod schema, por exemplo).
 * @param {AuthInput<T>} props - As propriedades (name, control, type, etc.) para configurar e conectar este input.
 */
export const AuthInputForm = <T extends FieldValues>({
  name,
  control,
  type,
  placeholder,
  disabled
}: AuthInput<T>) => {
  // Estado local para controlar se o texto do campo de senha é visível ou oculto.
  const [visible, setVisible] = useState(false)

  // Determina se o tipo original do input é 'password'.
  const isPassword = type === 'password'
  // Determina o tipo real do input a ser renderizado dinamicamente.
  // Se for um campo de senha E 'visible' for true, usa o tipo 'text' para mostrar o texto.
  // Caso contrário, usa o tipo original fornecido (ex: 'password', 'email', 'text').
  const inputType = isPassword && visible ? 'text' : type

  return (
    // FormField: Este componente do react-hook-form é a ponte que registra
    // o input com o hook form e gerencia seu estado (valor, touched, dirty, errors).
    <FormField
      name={name} // Conecta este FormField ao campo 'name' especificado no seu useForm.
      control={control} // Passa o objeto de controle do formulário para o FormField.
      // Render prop: Uma função que FormField chama para renderizar a UI do input.
      // Recebe um objeto '{ field, fieldState, formState }'. Usamos 'field' para conectar o input.
      render={({ field }) => (
        // FormItem: Componente de UI wrapper para agrupar um campo de formulário,
        // incluindo o input e sua mensagem de erro.
        <FormItem>
          {/* FormControl: Wrapper para o controle do formulário (o input real). */}
          <FormControl>
            {/* Div com posicionamento relativo. Usado para posicionar o botão de toggle da senha
                absolutamente no canto direito do input. */}
            <div className='relative'>
              {/* Input: O elemento input HTML real, estilizado pela sua biblioteca de UI. */}
              <Input
                {...field} // Espalha as propriedades fornecidas pelo react-hook-form (value, onChange, onBlur, etc.) no input nativo.
                type={inputType} // Usa o tipo dinâmico ('text' ou 'password' ou original).
                disabled={disabled} // Desabiliza o input se a prop 'disabled' for true.
                placeholder={placeholder} // Define o texto placeholder.
              />
              {/* Renderiza o botão de toggle da visibilidade da senha SOMENTE se o input for do tipo 'password'. */}
              {isPassword && (
                <Button
                  size='icon' // Define um tamanho predefinido para botões que contêm apenas ícones.
                  type='button' // **CRUCIAL:** Define o tipo como 'button' para evitar que ele submeta o formulário pai acidentalmente.
                  variant='ghost' // Define um estilo visual de botão 'fantasma' (geralmente sem fundo).
                  onClick={() => setVisible((prev) => !prev)} // Handler de clique para alternar o estado 'visible'.
                  aria-label={visible ? 'Hide password' : 'Show password'} // Atributo de acessibilidade para leitores de tela.
                  className='absolute top-0 right-0 text-muted-foreground hover:bg-transparent'> {/* Classes CSS para posicionamento absoluto e estilização visual. */}
                  {/* Renderiza o ícone apropriado (olho aberto/fechado) baseado no estado 'visible'. */}
                  {visible ? <EyeClosed /> : <Eye />}
                </Button>
              )}
            </div>
          </FormControl>
          {/* FormMessage: Componente de UI que exibe as mensagens de erro de validação
              associadas a este campo, gerenciadas pelo react-hook-form. */}
          <FormMessage className='text-xs text-right font-semibold' /> {/* Classes CSS para estilizar a mensagem de erro. */}
        </FormItem>
      )}
    />
  )
}
