import { Injectable } from '@nestjs/common';
import { Establishment } from 'entities/establishment';
import { User } from 'entities/user';
import * as mailjet from 'node-mailjet';
import { EstablishmentService } from 'src/establishment/establishment.service';


export interface Contact {
    email: string;
    message: string;
    fullName: string
}

@Injectable()
export class EmailingService {

    MailjetClient: mailjet.Email.Client;
    constructor() {
        this.MailjetClient = mailjet.connect('844cf3672a054dce03288bf6edc1a6c3', 'dced54a02cd6ac188358eb1e2541ecf9')
    }

    contact(contact: Contact) {
        const request = this.MailjetClient.post("send", {'version': 'v3.1'})
        .request({
            "Messages":[
                    {
                            "From": {
                                    "Email": 'contact@dclosset.com',
                                    "Name": "Nouveau message de Weeklyapp.be"
                            },
                            "To": [
                                    {
                                            "Email": 'contact@dclosset.com',
                                            "Name": "passenger 1"
                                    }
                            ],
                            "Subject": "Contact",
                            "TextPart": contact.message,
                            "HTMLPart": contact.message
                    }
            ]
        })
    }

    messageActivated(establishment: Establishment) {
        const request = this.MailjetClient.post("send", {'version': 'v3.1'})
        .request({
            "Messages":[
                    {
                            "From": {
                                    "Email": 'Hello@weekly-app.be',
                                    "Name": "Weekly"
                            },
                            "To": [
                                    {
                                            "Email": establishment.email,
                                            "Name": `${establishment.firstname}`
                                    }
                            ],
                            "Subject": "Votre établissement a été accepter sur weeklyapp.be!",
                            "TextPart": 'Texte de message établissement approuvé...',
                            "HTMLPart": 'Texte de message établissement approuvé...'
                    }
            ]
        })
    }

}
