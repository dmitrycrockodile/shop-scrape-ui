<script>
    import ArgonButton from "@/components/ArgonButton.vue";
    import UsersTable from "../components/UsersTable.vue"
    import { mapGetters, mapActions } from "vuex";
    import { fetchUsers, deleteUser } from "@/services/usersService";

    export default {
        name: "Product Index",
        mounted() {
            this.handleUsersFetch();
        },
        data() {
            return {
                // isPageLoading: true,
                // isProductsLoading: true,
            }
        },
        components: {
            ArgonButton,
            UsersTable
        },
        computed: {
            ...mapGetters({
                users: 'users/getUsers',
            })
        },
        methods: {
            ...mapActions({
                setUsers: 'users/setUsers',
                removeUser: 'users/removeUser'
            }),
            async handleUsersFetch() {
                const res = await fetchUsers();

                if (res.success) {
                    this.setUsers(res.data);
                }
            },
            async handleDelete(id) {
                const res = await deleteUser(id);

                if (res.success) {
                    this.removeUser(id);
                }
            },
            handleEdit(id) {
                this.$router.push({ name: 'Users / Edit', params: { id } });
            },
            handleRetailersShow(id) {
                this.$router.push({ name: 'Users / Retailers', params: { id } });
            }
        }
    }
</script>

<template>
    <div class="pt-6 pb-4 flex-grow-1">
        <UsersTable 
            :users="users"
            :showActions="true"
            @edit="handleEdit"
            @delete="handleDelete"
            @showRetailers="handleRetailersShow"
        >
            <template #create-button>
                <argon-button type="submit" color="primary" @click="$router.push('/users/create')">
                    Create
                </argon-button>
            </template>
        </UsersTable>  
    </div>
</template>