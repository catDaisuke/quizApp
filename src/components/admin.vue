<template>
  <v-container>
    <v-toolbar app color="#ffc0cb">
    <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-toolbar-title class="font-weight-light title">Wedding Quiz</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items class="hidden-sm-and-down"> -->
        <!-- <div class="font-weight-light">{{userId}}</div>
        <v-spacer></v-spacer>
        <div flat class="font-weight-light"><div v-if="isStarted">score : {{score}}</div></div> -->
        <!-- <v-btn flat>Link Three</v-btn> -->
        <!-- </v-toolbar-items> -->
    </v-toolbar>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
      </v-flex>

      <v-flex mb-4>
        <p class="subheading font-weight-regular">
        </p>
        <div v-if="!isStarted">
          <div v-if="!isEnd">
            <v-btn v-if="!isStarted" color="#ffc0cb"  v-on:click="createQuizAppProgressStatus">クイズ開始</v-btn>
          </div>
          <div v-else>
            全問終了
          </div>
            <v-data-table
              :headers="headers"
              :items="QuizAppMembers"
              class="elevation-1"
              :rows-per-page-items='[{"text":"alll","value":-1}]'
              :pagination.sync="pagination"
              hide-actions
            >
            <template v-slot:items="props">
              <td>{{ props.item.userId }}</td>
              <td class="text-xs-right">{{ props.item.score }}</td>
            </template>
          </v-data-table>
        </div>
        <div v-else>
          <div v-if="!isNextQuestion">
            <div class = "sentence">{{nowQuestion.sentence}}</div>
            <v-container
              fluid
              grid-list-md
            >
            <v-layout row wrap>
            <v-flex xs6>
            <v-card>
            <!-- <v-img
              src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
              aspect-ratio="2.75"
            ></v-img> -->
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">1. {{nowQuestion.choise1}}</h3>
                <div></div>
              </div>
            </v-card-title>
            <!-- <v-card-actions>
              <v-btn flat color="orange">Share</v-btn>
              <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions> -->
          </v-card>
          <v-card>
            <!-- <v-img
              src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
              aspect-ratio="2.75"
            ></v-img> -->
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">2. {{nowQuestion.choise2}}</h3>
                <div></div>
              </div>
            </v-card-title>
            <!-- <v-card-actions>
              <v-btn flat color="orange">Share</v-btn>
              <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions> -->
          </v-card>
          </v-flex>
          <v-flex xs6>
            <v-card>
            <!-- <v-img
              src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
              aspect-ratio="2.75"
            ></v-img> -->
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">3. {{nowQuestion.choise3}}</h3>
                <div></div>
              </div>
            </v-card-title>
            <!-- <v-card-actions>
              <v-btn flat color="orange">Share</v-btn>
              <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions> -->
          </v-card>
            <v-card>
            <!-- <v-img
              src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
              aspect-ratio="2.75"
            ></v-img> -->
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">4. {{nowQuestion.choise4}}</h3>
                <div></div>
              </div>
            </v-card-title>
            <!-- <v-card-actions>
              <v-btn flat color="orange">Share</v-btn>
              <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions> -->
          </v-card>
          </v-flex>
          </v-layout>
          </v-container>
            <!-- <p>1 {{nowQuestion.choise1}}</p>
            <p>2 {{nowQuestion.choise2}}</p>
            <p>3 {{nowQuestion.choise3}}</p>
            <p>4 {{nowQuestion['choise4']}}</p> -->
            <v-btn v-if="!isNextQuestion" color="#ffc0cb"  v-on:click="ansQuestion">回答</v-btn>
          </div>
          <div v-if="isNextQuestion">
            <v-tabs
              color="#ffc0cb"
              dark
              slider-color="yellow"
            >
              <v-tab>正解</v-tab>
              <v-tab>score一覧</v-tab>
              <v-tab-item>
              <v-card>
                <v-img
                  :src="ansImgPath"
                  height="300px"
                >
                </v-img>
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{QuizAppProgressStatuses[0].num}}. {{correctAnswer}}</h3>
                  <div></div>
                </div>
              </v-card-title>
              </v-card>
                <!-- <p>正解</p>
                <p>{{QuizAppProgressStatuses[0].num}}. {{correctAnswer}}</p> -->
              </v-tab-item>
              <v-tab-item>
                <v-data-table
                  :headers="headers"
                  :items="QuizAppMembers"
                  class="elevation-1"
                  :rows-per-page-items='[{"text":"alll","value":-1}]'
                  :pagination.sync="pagination"
                  hide-actions
                >
                  <template v-slot:items="props">
                    <td>{{ props.item.userId }}</td>
                    <td class="text-xs-right">{{ props.item.score }}</td>
                  </template>
                </v-data-table>
              </v-tab-item>
            </v-tabs>
            <v-btn v-if="isNextQuestion" color="success"  v-on:click="nextQuestion">次の問題へ</v-btn>
          </div>
        </div>
      </v-flex>

      <v-flex
        mb-5
        xs12
      >
        <v-layout justify-center>
          <v-btn color="success"  v-on:click="reset">リセット</v-btn>
        </v-layout>
      </v-flex>

      <v-flex
        xs12
        mb-5
      >
        <v-layout justify-center>
        </v-layout>
      </v-flex>

      <v-flex
        xs12
        mb-5
      >

        <v-layout justify-center>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import taskService from '../services/service'
  export default {
    data: () => ({
      pagination: {
        sortBy: 'score',
        descending: true,
        rowsPerPage: 100,
      },
      id: null,
      password: null,
      QuizAppProgressStatuses: [],
      QuizAppMembers: [],
      QuizAppQuestions: [],
      headers: [
        {
          text: 'ユーザー名',
          align: 'left',
          sortable: false,
          value: 'userId'
        },
        { text: 'スコア', value: 'score' },
      ]
    }),
    computed: {
      isStarted() {
        console.log(this.QuizAppProgressStatuses)
        if(this.QuizAppProgressStatuses.length == 0) {
          return false
        }
        if(!this.QuizAppProgressStatuses[0].isStarted){
          return false
        }
        return true
      },
      isEnd() {
        try {
        if(this.QuizAppProgressStatuses[0].status === 'A') {
          if(this.QuizAppProgressStatuses[0].isStarted === false) {
            return true
          }
        }
        return false
        } catch (e) {
          return false
        }
      },
      isNextQuestion() {
        if(this.QuizAppProgressStatuses.length == 0) {
          return false
        }
        if(!this.QuizAppProgressStatuses[0].isStarted){
          return false
        }
        if(this.QuizAppProgressStatuses[0].status === 'A') {
          return true
        }
        return false
      },
      nowQuestion() {
        /* クイズ開始ステータス時は設問と選択肢を返却 */
        if(this.QuizAppProgressStatuses.length === 1 && this.QuizAppProgressStatuses[0].isStarted
         && this.QuizAppQuestions.length >= this.QuizAppProgressStatuses[0].num) {
          return this.QuizAppQuestions[this.QuizAppProgressStatuses[0].num-1]
        } else if(this.QuizAppProgressStatuses.length === 0) {
          let contents = {
          sentence: 'クイズ準備中',
          choise1: '',
          choise2: '',
          choise3: '',
          choise4: ''
          }
          return contents
        } else if(!this.QuizAppProgressStatuses[0].isStarted) {
          let contents = {
          sentence: 'クイズ準備中',
          choise1: '',
          choise2: '',
          choise3: '',
          choise4: ''
          }
          return contents
        } else {
          let contents = {
          sentence: '全クイズ終了',
          choise1: '',
          choise2: '',
          choise3: '',
          choise4: ''
          }
          return contents
        }
      },
      correctAnswer() {
        try{
        let num = this.QuizAppProgressStatuses[0].num
        let ans = this.QuizAppQuestions[num-1].ans
        return this.QuizAppQuestions[num-1][`choise${ans}`]
        } catch(e) {
          return 'error'
        }
      },
      ansImgPath() {
        try{
          let num = this.QuizAppProgressStatuses[0].num
          let id = this.QuizAppQuestions[num-1].id
          return `https://s3-ap-northeast-1.amazonaws.com/quizapp-img/${id}.jpg`
        } catch(e) {
          return 'error'
        }
      }
    },
    async mounted () {
      this.QuizAppProgressStatuses = await taskService.getQuizAppProgressStatus()
      this.QuizAppMembers = await taskService.getQuizAppMembers()
      this.QuizAppQuestions = await taskService.getQuizAppQuestions()

      taskService.onCreateQuizAppProgressStatus(this.getQuizAppProgressStatus)
      taskService.onUpdateQuizAppProgressStatus(this.getQuizAppProgressStatus)
      taskService.onDeleteQuizAppProgressStatus(this.getQuizAppProgressStatus)
      taskService.onCreateQuizAppMember(this.getQuizAppMembers)
      taskService.onUpdateQuizAppMember(this.getQuizAppMembers)
    },
    methods: {
      async createQuizAppProgressStatus () {
        if(this.QuizAppProgressStatuses.length == 0) {
          await taskService.createQuizAppProgressStatus()
        } else if(!this.QuizAppProgressStatuses[0].isStarted){
          let quizAppProgressStatus = {
            id: this.QuizAppProgressStatuses[0].id,
            num: 1,
            status: 'Q',
            isStarted: true
          }
          await taskService.updateQuizAppProgressStatus(quizAppProgressStatus)
        } else {
          alert('クイズはすでに開始されています')
        }
      },
      async getQuizAppProgressStatus () {
        this.QuizAppProgressStatuses = await taskService.getQuizAppProgressStatus()
      },
      async getQuizAppMembers() {
        this.QuizAppMembers = await taskService.getQuizAppMembers()
      },
      async nextQuestion () {
        let quizAppProgressStatusId = this.QuizAppProgressStatuses[0].id
        let quizAppProgressStatusNum = this.QuizAppProgressStatuses[0].num
        let quizAppProgressStatusStatus = this.QuizAppProgressStatuses[0].status

        if(quizAppProgressStatusStatus === 'A' && quizAppProgressStatusNum != this.QuizAppQuestions.length) {
          let quizAppProgressStatus = {
            id: quizAppProgressStatusId,
            num: quizAppProgressStatusNum + 1,
            status: 'Q',
            isStarted: true
          }
          await taskService.updateQuizAppProgressStatus(quizAppProgressStatus)
        } else if (quizAppProgressStatusStatus === 'A' && quizAppProgressStatusNum == this.QuizAppQuestions.length){
          alert('全問題終了')
          // let quizAppProgressStatusId = this.QuizAppProgressStatuses[0].id
          // let quizAppProgressStatusNum = this.QuizAppProgressStatuses[0].num
          // let quizAppProgressStatusStatus = this.QuizAppProgressStatuses[0].status
          let quizAppProgressStatus = {
            id: quizAppProgressStatusId,
            num: quizAppProgressStatusNum,
            status: 'A',
            isStarted: false
          }
          await taskService.updateQuizAppProgressStatus(quizAppProgressStatus)
        } else {
          alert('回答を締め切っていません')
        }
      },
      async ansQuestion () {
        let quizAppProgressStatusId = this.QuizAppProgressStatuses[0].id
        let quizAppProgressStatusNum = this.QuizAppProgressStatuses[0].num
        let quizAppProgressStatusStatus = this.QuizAppProgressStatuses[0].status
        if(quizAppProgressStatusStatus === 'Q') {
          let quizAppProgressStatus = {
            id: quizAppProgressStatusId,
            num: quizAppProgressStatusNum,
            status: 'A',
            isStarted: true
          }
          await taskService.updateQuizAppProgressStatus(quizAppProgressStatus)
        } else {
          alert('回答オープン済みです')
        }
      },
      async reset() {
        alert('得点と進捗状況を初期化します')
        for(let member of this.QuizAppMembers) {
          member.score = 0
          await taskService.updateQuizAppMember(member)
        }
        let quizAppProgressStatus = {
            id: this.QuizAppProgressStatuses[0].id,
            num: 1,
            status: 'Q',
            isStarted: false
        }
        await taskService.updateQuizAppProgressStatus(quizAppProgressStatus)

      },
      /**
       * 全ユーザー削除
       */
      async userReset() {

      }
    }
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Great+Vibes');

h1 {
  font-family: 'Great Vibes', cursive !important;
}
.title {
  font-family: 'Great Vibes', cursive !important;
}

.sentence {
  font-size: 2.5rem;
}

p {
  color:rgba(0,0,0,0.54);
}
</style>
