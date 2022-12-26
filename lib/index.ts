// import modules
import { Client } from "@notionhq/client"
import { CreatePageParameters, CreatePageResponse } from '@notionhq/client/build/src/api-endpoints'

type NotionAPIResult = { result: 'error' | 'success', message?: string }

type WithAuth<P> = P & {
    auth?: string;
};

export type CreatePageParametersData = WithAuth<CreatePageParameters>

export interface CreateData {
    [key: string]: string | number | boolean | string[],
}

export default class NotionAPI {
    private notion:Client
    private databaseId: string
    private columns: any

    constructor(integrationKey:string, databaseId:string) {
        this.notion = new Client({ auth: integrationKey })
        this.databaseId = databaseId
        this.columns = {}
    }
    
    async setDatabaseId(databaseId: string) {
        this.databaseId = databaseId
        await this.getDatabaseColumns()
    }

    async getDatabaseColumns() {
        try {
            const response = await this.notion.databases.retrieve({ database_id: this.databaseId })

            const result:any = {}

            Object.keys(response.properties).forEach(key => {
                result[key] = response.properties[key]
            })

            this.columns = result

            return this.columns
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async getColumns(): Promise<any> {
        if (Object.keys(this.columns).length === 0) {
            return this.getDatabaseColumns()
        }
        return this.columns
    }

    makeCreateData(createData: CreateData): CreatePageParametersData {
        const returnData: CreatePageParametersData = {
            parent: { database_id: this.databaseId },
            properties: {}
        }
        
        Object.keys(createData).forEach(key => {
            if (key in this.columns) {
                const column = this.columns[key]
                const value = createData[key]

                switch (column.type) {
                    case 'title':
                        returnData.properties[key] = {
                            title: [
                                {
                                    text: {
                                        content: value as string
                                    }
                                }
                            ]
                        }
                        break
                    case 'rich_text':
                        returnData.properties[key] = {
                            rich_text: [
                                {
                                    text: {
                                        content: value as string
                                    }
                                }
                            ]
                        }
                        break
                    case 'number':
                        returnData.properties[key] = {
                            number: value as number
                        }
                        break
                    case 'url':
                        returnData.properties[key] = {
                            url: value as string
                        }
                        break
                    case 'select':
                        returnData.properties[key] = {
                            select: {
                                name: value as string
                            }
                        }
                        break
                    case 'multi_select':
                        returnData.properties[key] = {
                            multi_select: (value as string[]).map((item) => {
                                return {
                                    name: item
                                }
                            })
                        }
                        break
                    case 'people':
                        // returnData.properties[key] = {
                        //     people: (value as string[]).map((item) => {
                        //         return {
                        //             id: item
                        //         }
                        //     })
                        // }
                        throw new Error(`${column.type} is not supported yet.`)
                        break
                    case 'email':
                        returnData.properties[key] = {
                            email: value as string
                        }
                        break
                    case 'phone_number':
                        returnData.properties[key] = {
                            phone_number: value as string
                        }
                        break
                    case 'date':
                        returnData.properties[key] = {
                            date: {
                                start: value as string
                            }
                        }
                        break
                    case 'checkbox':
                        returnData.properties[key] = {
                            checkbox: value as boolean
                        }
                        break
                    case 'status':
                        returnData.properties[key] = {
                            name: value as string
                        }
                        break
                    default:
                        throw new Error(`${column.type} is not supported yet.`)
                        break
                }
            }
        })

        return returnData
    }

    async addDatabaseRow(data: CreatePageParametersData | CreateData, debug: boolean = false): Promise<NotionAPIResult> {
        if (!await this.getColumns()) {
            throw new Error('Database columns is not found.')
        }

        // if data type is CreateData, convert to createDataType
        const convertData: CreatePageParametersData = ('parent' in data) ? data as CreatePageParametersData : this.makeCreateData(data as CreateData)
        
        if (debug) {
            console.log(convertData)
        }

        return new Promise((resolve, reject) => {
            try {
                this.notion.pages.create(convertData).then((response: CreatePageResponse) => {

                    if (response.object === 'page') {
                        resolve({result: 'success'})
                    } else {
                        console.log(response)
                        resolve({result: 'error', message: 'Result is not page'})
                    }
                }
                ).catch((error) => {
                    console.error(error)
                    reject({result: 'error', message: 'Notion API Error'})
                })
            }catch (error) {
                console.error(error)
                reject({result: 'error', message: 'Notion API Error'})
            }
        })
    }
}