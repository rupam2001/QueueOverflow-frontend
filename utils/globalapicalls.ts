import Cookie from 'js-cookie'
import { ENDPOINT, QuestionCreateRoute } from './constanse'


interface questionPropType {
    title: string,
    body: string,
    tags: Array<string>
    type: string,
    time: Date
}
interface articlePropType {
    cover_photo: string,
    title: string,
    body: string,
    tags: Array<string>,
}



async function createQuestionAsync(question: questionPropType): Promise<{ success: boolean, newQuestion: any }> {

    const token = Cookie.get('token')
    if (!token) return { success: false, newQuestion: {} }

    const { success, newQuestion } = await fetch(ENDPOINT + QuestionCreateRoute, { method: 'POST', body: JSON.stringify({ token, ...question }), headers: { "Content-Type": "application/json" } }).then(resp => resp.json())

    return { success, newQuestion }
}

async function createAnswerAsync({ body, q_id }): Promise<{ success: boolean, newAns: any }> {

    const token = Cookie.get('token')

    if (!token || !q_id || !body) return { success: false, newAns: {} }

    const time = new Date

    const { success, newAns } = await fetch(ENDPOINT + "/question/ans/create", { method: 'POST', body: JSON.stringify({ token, body, time, q_id }), headers: { "Content-Type": "application/json" } }).then(resp => resp.json())
    return { success, newAns }
}

async function createArticleAsync(article: articlePropType): Promise<{ success: boolean, newArticle: any }> {

    const token = Cookie.get('token')

    if (!token) return { success: false, newArticle: {} }
    // alert(token)

    const time = new Date

    const { success, newArticle } = await fetch(ENDPOINT + "/question/article/create", { method: 'POST', body: JSON.stringify({ ...article, time, type: 'article', token }), headers: { "Content-Type": "application/json" } }).then(resp => resp.json())
    return { success, newArticle }
}



async function getQuestionsAsync(skip: Number, limit: Number): Promise<Array<any>> {
    const { questions } = await fetch(ENDPOINT + "/question/getall/" + skip + "/" + limit, { method: 'GET', headers: { "Content-Type": "application/json" } }).then(resp => resp.json())
    return questions
}
async function getArticleAsync(skip: Number, limit: Number): Promise<Array<any>> {
    const { articles } = await fetch(ENDPOINT + "/question/article/getall/" + skip + "/" + limit, { method: 'GET', headers: { "Content-Type": "application/json" } }).then(resp => resp.json())
    return articles
}

async function getMyQuestionsAsync(skip: Number, limit: Number): Promise<Array<any>> {
    const token = Cookie.get('token')
    if (!token) throw new Error("token not found")
    const { questions } = await fetch(ENDPOINT + "/question/getall/mine/" + skip + "/" + limit, { method: 'POST', body: JSON.stringify({ token: token }), headers: { "Content-Type": "application/json" } }).then(resp => resp.json())
    return questions
}


async function getNotificationsAsync(skip: Number, limit: Number): Promise<Array<any>> {
    const token = Cookie.get('token')
    if (!token) throw new Error("token not found")

    const { notifications } = await fetch(ENDPOINT + "/notification/get", { method: 'POST', body: JSON.stringify({ token, skip, limit }), headers: { "Content-Type": "application/json" } }).then(resp => resp.json())
    return
}


async function searchRemoteAsync(query: string, skip: Number, limit: Number): Promise<Array<any>> {
    const { questions } = await fetch(ENDPOINT + "/search/question", { method: 'POST', body: JSON.stringify({ query, skip, limit }), headers: { "Content-Type": "application/json" } }).then(resp => resp.json())
    return questions
}

export { createQuestionAsync, getQuestionsAsync, searchRemoteAsync, createAnswerAsync, getMyQuestionsAsync, createArticleAsync, getArticleAsync }