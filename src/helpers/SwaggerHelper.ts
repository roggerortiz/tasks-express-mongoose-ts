import yaml from 'js-yaml'
import fs from 'node:fs'
import path from 'node:path'
import swaggerAutogen from 'swagger-autogen'
import ServerHelper from './ServerHelper'

export default class SwaggerHelper {
  static outputFile = './docs/swagger.json'
  static routeFiles = ['./src/routes/index.ts']
  static jsonPath = path.resolve(__dirname, '../docs/swagger.json')
  static yamlPath = path.resolve(__dirname, '../docs/swagger.yaml')

  static config() {
    const config: any = {
      info: {
        title: 'Tasks API'
      },
      servers: [{ url: `${ServerHelper.url()}/api/v1` }],
      tags: [{ name: 'Auth' }, { name: 'Task' }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer'
          }
        },
        schemas: {
          User: {
            id: 'string',
            first_name: 'string',
            last_name: 'string',
            email: 'string',
            phone: 'string',
            username: 'string'
          },
          AuthenticatedUser: {
            token: 'string',
            user: {
              $ref: '#/components/schemas/User'
            }
          },
          LoginUser: {
            $username: 'string',
            $password: 'string'
          },
          SaveUser: {
            $first_name: 'string',
            $last_name: 'string',
            $email: 'string',
            $phone: 'string',
            $username: 'string',
            $password: 'string'
          },
          Task: {
            id: 'string',
            title: 'string',
            slug: 'string',
            description: 'string',
            important: false,
            user_id: 'string'
          },
          SaveTask: {
            $title: 'string',
            description: 'string',
            important: false
          },
          Message: {
            message: 'string'
          },
          Error: {
            path: 'string',
            message: 'string'
          }
        }
      }
    }

    return config
  }

  static docs() {
    const jsonText: string = fs.readFileSync(this.jsonPath, 'utf8')
    return JSON.parse(jsonText)
  }

  static async generateJsonFile() {
    await swaggerAutogen({ openapi: '3.0.0' })(this.outputFile, this.routeFiles, this.config())
  }

  static generateYamlFile() {
    const yamlDocs: string = yaml.dump(this.docs())
    fs.writeFileSync(this.yamlPath, yamlDocs, 'utf8')
  }

  static async generate() {
    await this.generateJsonFile()
    this.generateYamlFile()
  }
}
