import axios from 'axios'
import { CurrencyType } from '../utils/helper'


//const API = axios.create({ baseURL: 'http://localhost:3001'})
const API = axios.create({ baseURL: ''})

const profile = JSON.parse(localStorage.getItem('profile') ?? "{}")

const accessHeader = {
    headers: {
      'Authorization': `token ${profile ? profile.accessToken : null}`
    }
  }

export interface IUserDetails {
  emailId: string,
  firstName: string,
  lastName: string,
}

interface IUserDetailsResponseType {
  data: {
    user: IUserDetails
  }
}

export const loginIn = (formData: any) => API.post('/api/users/v1/login', formData)

export const register = (formData: any) => API.post('/api/users/v1/register', formData)

export const deleteUser = (formData: any) => API.delete('/api/users/v1/delete', {headers:accessHeader.headers,data:formData})

export const updatePassword = (formData: any) =>API.post('/api/users/v1/updatePassword', formData, accessHeader)

export const getUser = (formData: any) => API.post<any, IUserDetailsResponseType, number>('/api/users/v1/view', formData, accessHeader)

export const editUser = (formData: any) => API.post('/api/users/v1/edit', formData, accessHeader)

export const getUserGroups = (formData: any) => API.post('/api/group/v1/user', formData, accessHeader)

export const getEmailList = () => API.get('/api/users/v1/emailList', accessHeader)

export const createGroup = (formData: any) => API.post('/api/group/v1/add', formData,  accessHeader)

export const editGroup = (formData: any) => API.post('/api/group/v1/edit', formData, accessHeader)

// this one
/*
setGroupCurrency(response_group?.data?.group?.groupCurrency);
setGroupMembers(response_group?.data?.group?.groupMembers);
formik.values.expenseMembers = response_group?.data?.group?.groupMembers;
*/

interface IGroupDetailsResponseType {
  data: {
    group: {
      groupCurrency: CurrencyType,
      groupMembers: string[],
    }
  }
}

export interface IExpenseDetails {
  groupId: any,
  expenseName: string,
  expenseDescription: string,
  expenseOwner: string,
  expenseMembers: string[],
  expenseAmount: number,
  expenseCategory: string,
  expenseDate: Date,
  expenseType: string,
  _id: string,
  expenseCurrency: CurrencyType,
  expensePerMember: number,
}

interface IExpenseDetailsResponseType {
  data: {
    expense: IExpenseDetails,
  }
}

export const getGroupDetails = (formData: number) => API.post<any, IGroupDetailsResponseType, number>('/api/group/v1/view', formData, accessHeader)

export const getGroupExpense = (formData: any) => API.post('/api/expense/v1/group', formData, accessHeader)

export const addExpense = (formDate: any) => API.post('/api/expense/v1/add', formDate, accessHeader)

export const editExpense = (formDate: any) => API.post('/api/expense/v1/edit', formDate, accessHeader)

export const deleteExpense = (formData: any) => API.delete('/api/expense/v1/delete', {headers:accessHeader.headers,data:formData})

export const getGroupCategoryExp = (formData: any) => API.post('/api/expense/v1/group/categoryExp', formData, accessHeader)

export const getGroupMonthlyExp = (formData: any) => API.post('/api/expense/v1/group/monthlyExp', formData, accessHeader)

export const getGroupDailyExp = (formData: any) => API.post('/api/expense/v1/group/dailyExp', formData, accessHeader)

export const getUserExpense = (formData: any) => API.post('/api/expense/v1/user', formData, accessHeader)

export const getUserMonthlyExp = (formData: any) => API.post('/api/expense/v1/user/monthlyExp', formData, accessHeader)

export const getUserDailyExp = (formData: any) => API.post('/api/expense/v1/user/dailyExp', formData, accessHeader)

export const getUserCategoryExp = (formData: any) => API.post('/api/expense/v1/user/categoryExp', formData, accessHeader)

export const getRecentUserExp = (formData: any) => API.post('/api/expense/v1/user/recent', formData, accessHeader)

export const getExpDetails = (formData: any) => API.post<any, IExpenseDetailsResponseType, number>('/api/expense/v1/view', formData, accessHeader)

export const getSettle = (formData: any) => API.post('/api/group/v1/settlement', formData, accessHeader)

export const makeSettle = (formData: any) => API.post('/api/group/v1/makeSettlement', formData, accessHeader)