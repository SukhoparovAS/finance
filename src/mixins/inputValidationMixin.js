import { useVuelidate } from "@vuelidate/core";
import { required, minLength, numeric, helpers } from "@vuelidate/validators";

export default{
    data(){
        return{
            v$: useVuelidate(),
            minLength: 8,
            requiredMessage: "Поле является обязательным.",
            numericMessage: "Значение дожно являться числом.",
        }
    },
    computed:{
        minLengthMessage(){
            return `Минимальная длинна пароля ${this.minLength} символов.`
        },
        defaultReqired(){
            return helpers.withMessage(this.requiredMessage, required)
        },
        defaultMinLength(){
            return helpers.withMessage(this.minLengthMessage, minLength(this.minLength))
        },
        defaultNumeric(){
            return helpers.withMessage(this.numericMessage, numeric)
        }
    },
    methods: {
        errorsBy(name){
          const errors = []
          this.v$.$errors.forEach(error => {
            if (error.$property == name){
              errors.push(error.$message)
            }
          })
          return errors
        },
    }
}