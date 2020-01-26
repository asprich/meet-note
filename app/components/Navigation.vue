<template>
    <v-list>
        <v-list-item v-for="link in links" :key="link.text" :to="link.route" ripple>
          <v-list-item-action>
            <v-icon v-text="link.icon"></v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="link.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    name:"Navigation",
    data:() =>({
        links: [
            { icon:"mdi-home", text:"Dashboard", route:"/"},
            { icon:"mdi-plus-circle-outline", text:"New", route:{name:"new"}},
            { icon:"mdi-marker-check", text:"Action Items", route:{name:"action-items"}},
            { icon:"mdi-thumb-up", text:"Decisions", route:{name:"decisions"}}
        ]
    })
}
</script>