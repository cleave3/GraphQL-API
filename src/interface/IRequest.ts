import { Request } from "express";


export interface IRequest extends Request {
    auth: {
        user?: {
            uid: string
            email: string
            tel: string
            accountNumber: string
            middleName: string
            firstName: string
            lastName: string
            isEmailVerified: boolean,
            isTelVerified: boolean,
            isEnabled: boolean,
            isUser: boolean
        },
        enterprise?: {
            _id: string
            adherent: string
            uid: string
            name: string
            key: string
            accountNumber: string
            incomeAccountNumber: string
            tel: string
            csl: string
            ety: string
            email: string
            state: string
            desc: string
            address: string
            status: string
            localGovernmentArea: string
            timestamp: number,
            lastModified: number
        }
    },
    isAuth?: boolean
}