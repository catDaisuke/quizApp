import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import appSyncConfig from './aws-exports'
import Amplify from 'aws-amplify'

const amplifyConfig = {
  'aws_appsync_graphqlEndpoint': appSyncConfig.aws_appsync_graphqlEndpoint,
  'aws_appsync_region': appSyncConfig.aws_appsync_region,
  'aws_appsync_authenticationType': appSyncConfig.aws_appsync_authenticationType,
  'aws_appsync_apiKey': appSyncConfig.aws_appsync_apiKey
}
Amplify.configure(amplifyConfig)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
