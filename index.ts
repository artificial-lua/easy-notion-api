// import modules
import { Client } from "@notionhq/client"
import { CreatePageParameters, CreatePageResponse } from '@notionhq/client/build/src/api-endpoints'
import { DatabaseColumnsType } from './lib/types';

type NotionAPIResult = { result: 'error' | 'success', message?: string }

type WithAuth<P> = P & {
    auth?: string;
};

type objectType = {
    [key: string]: string | number | boolean
}

export type createDataType = WithAuth<CreatePageParameters>

export interface CreateData {
    [key: string]: string | number | boolean | string[],
}

export default class NotionAPI {
    private notion:Client
    private databaseId: string
    private columns: DatabaseColumnsType

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

            const result:DatabaseColumnsType = {}

            Object.keys(response.properties).forEach(key => {
                result[key] = response.properties[key]
            })

            this.columns = result

            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    getColumns(): DatabaseColumnsType {
        return this.columns   
    }

    makeCreateData(createData: CreateData): createDataType {
        const properties: any = {}

        Object.keys(createData).forEach(key => {
            properties[key] = {
                type: this.columns[key].type,
                id: this.columns[key].id,
                name: key,
                [this.columns[key].type]: [{
                    [this.columns[key].type]: createData[key]
                }]
            }
        })

        return {
            parent: { database_id: this.databaseId },
            properties: {
                ...properties
            }
        }
    }

    addDatabaseRow(data: createDataType | CreateData): Promise<NotionAPIResult> {
        // if data type is CreateData, convert to createDataType
        const convertData: createDataType = ('parent' in data) ? data as createDataType : this.makeCreateData(data as CreateData)

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