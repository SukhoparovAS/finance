import OperationTypeSelect from "@/components/AppOperationTypeSelect.vue";

export default {
    components:{
        OperationTypeSelect
    },
    
    computed:{
        operationType(){
            return this.$store.getters.getOperationType
        },
    }
}
