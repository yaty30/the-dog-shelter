import react, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import { preFillEmail, registerForm } from 'src/states/registerStates';
import { register as registerDialog } from 'src/states/globalDialogStates';
import { messageBar } from '../../states/generalStates'


import { observer } from 'mobx-react-lite'
import { registration } from 'src/apis/registeration';

export default observer((data) => {
    const [open, setOpen] = useState(false);
    const [clicked, setclicked] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmitForm = () => {
        registration(data.data).then(x => {
            if (x) {
                // registerForm.setData(data.data)
                handleClose()
                messageBar.open("", "success")
                preFillEmail.setEmail("")
                registerDialog.setForm(false)
                messageBar.open("Your Charity Worker account has been successfully created!", "success")
            } else {
                messageBar.open("This email is already registered.", "error")
            }
            preFillEmail.setEmail("")
            handleClose()
        })
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                Continue
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll="paper"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Charity Worker Terms & Conditions`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <span style={{ whiteSpace: 'pre-line' }}>
                            {`Proprietary Rights\n\n
The Content included on the Site, including, without limitation, the text, software, scripts, graphics, photos, sounds, music, videos, interactive features and the like, and the trademarks, service marks and logos contained therein, are owned by or licensed to The Canine Shelter charity worker, and are subject to copyright and other rights under international intellectual property laws.\n
We do not claim ownership to the Content posted by you, but by posting Content on the website you automatically grant, and you represent and warrant that you have the right to grant, to The Canine Shelter charity worker an irrevocable, perpetual, non-exclusive, fully paid, worldwide license to use, copy, perform, display, and distribute said Content and to prepare derivative works of, or incorporate into other works, said Content, and to grant and authorize sublicenses 
\n\t(through multiple tiers) of the foregoing.
\nPermission to use content, documents and related graphics delivered from this Website is restricted. You may access, use and copy information and materials available through this Website only for purposes of considering and/or participating in projects that are facilitated through The Canine Shelter charity worker, posted by Participating Organizations; and you may only use with the express consent of the organization/group associated with the content. That information and those materials, including pages and content, may not be copied, distributed, modified, published, or transmitted in any other manner, including for use in creative work or to sell or promote other products or services. Violation of this policy may result in infringement of The Canine Shelter charity worker' or other third parties' intellectual property and contractual rights which are protected by domestic, state and federal law and international law and treaties and could result in substantial civil and criminal penalties.
\nWhen retrieving information from our Website, you are prohibited from 
\n\t(1) using or attempting to use spiders, robots, avatars, intelligent agents, or any other extraction or navigation search except for a normal owser; 
\n\t(2) aggregating, copying or duplicating any of the materials or information available from the Website except for the reasonable amount of materials and information temporarily required for an ordinary single use of the site; or 
\n\t(3) accessing data not intended for legitimate use of the Website for the purposes stated above.
\nIf you feel that the Content on this Site belongs to you and has been wrongfully posted by a user, in violation of your copyright to such Content, then you may provide notice of such infringement to The Canine Shelter charity worker contact@The Canine Sheltercharity worker.com or hola@0plastic.es. Please provide the following information along with the Notice:
\nIdentify the infringing material, with enough detail so that we may locate it on the website;
\nA statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;
\nA statement by you declaring under penalty of perjury that 
\n\t(1) the above information in your Notice is accurate, and 
\n\t(2) that you are the owner of the copyright interest involved or that you are authorized to act on behalf of that owner;
\nYour address, telephone number, and email address; and
\nYour physical or electronic signature
\nTravel
\nThe charity worker is solely responsible for arranging and paying for their own travel, specifically including all airfares or other transport costs to and from the host country, as well as any local transport costs. It is the responsibility of the charity worker to carry all necessary documents when traveling abroad. While The Canine Shelter charity worker may advise the charity worker on required travel documentation, The Canine Shelter charity worker is not responsible for any supporting documents necessary for the charity worker's travel needs or other purposes. charity workers are responsible for ensuring their travel documents are up to date and valid for travel.
\nAll charity workers must obtain, on their own initiative, the relevant visa for the country they are travelling to. All questions regarding travel and visas should be put to the relevant embassy in the home country before travelling. The Canine Shelter charity worker does not endorse listed organizations, and charity workers are not agents of The Canine Shelter charity worker.
\nInsurance
\nTravel insurance is mandatory for each charity worker, and the charity worker will purchase this prior to departing on the trip. The charity worker is solely responsible for evaluating and determining the type, extent and levels of any insurance coverage they need or desire for their planned charity worker travel period. This must cover their entire travel period. However, if the charity worker is interested The Canine Shelter charity worker can offer a travel insurance through one of our insurance partners.
\nRefund Policy
\nThe Canine Shelter charity worker's registration and program fees are designed to be very affordable, especially when compared to companies who provide comparable charity worker travel services. As a consequence, The Canine Shelter charity worker is unable to provide and does not provide a total refund policy.
\nRegistration Fees
\nPayment of registration fees confirms a charity worker's acceptance onto one of The Canine Shelter charity worker's charity worker programs. Registration fees are not transferable to other persons and further details are set out on our website.
\nThe registration fee is refundable until sixty days before the start date of the charity worker's chosen program 
\n\t(based on Spanish time). All registration fee refunds are subject to a 150€ cancellation fee, incurred as a result of administrative and processing costs. Requests for registration fee refunds must be made via a email to your The Canine Shelter charity worker Program Manager, clearly detailing the reasons for cancellation.
\nCancellations are subject to the following policies:
\nThe circumstances regarding eligibility for a refund and the associated notice period are based on the earliest start date the charity worker has ever been registered for.
\nIf a charity worker cancels sixty days or more before their earliest program start date, they can request a refund of the registration fee, which will be provided less a 150€ cancellation fee. Alternatively, they may ask for a registration fee credit to be held in their name for future use on any The Canine Shelter charity worker program, subject to availability, for a period of twelve months from their earliest registered start date. This credit may be issued less the value of any change fees the charity worker has incurred.
\nIf a charity worker cancels less tan fifty-nine days before their program's start date, no refund of registration fees is available. A registration fee credit, less any change fees the charity worker has incurred, may be held in their name for a period of twelve months from their earliest registered start date, for future use on another The Canine Shelter charity worker program, subject to program availability and at the discretion of the The Canine Shelter charity worker Program Manager.
\ncharity workers who apply and cancel within the timeframes mentioned above are held to the same conditions in relation to their eligibility for a refund.
\nIn case of force majeure, i.e. an event that happens outside of the charity workers' control, including natural disasters, civil unrest and/or any other unforeseeable event of this kind that could disrupt the charity worker trip, they can request a refund of the registration fee, which will be provided less a 150€ cancellation fee. Alternatively, they may ask for a registration fee credit to be held in their name for future use on any The Canine Shelter charity worker program, subject to availability, for a period of twelve months from their earliest registered start date. This credit may be issued less the value of any change fees the charity worker has incurred.
\nOnce a charity worker's refund request has been received by The Canine Shelter charity worker, they will be notified via email. If no notification is received within three working days, the assumption should be made that the request has not been received and the charity worker is advised to contact his or her The Canine Shelter charity worker Program Manager again.
\nIf a charity worker registers and requests a verification letter, they cannot then receive a refund for their registration fee should they withdraw from the program.
\nWhere a group of ten or more people is charity workering with The Canine Shelter charity worker, the group leader must register ahead of other group members in order to secure the group's dates and plans. Group members must then apply and register no less than sixty days before the program starts. Group members who register less than sixty days before the program start date may be excluded from the program, unless approved by The Canine Shelter charity worker.
\nThe Canine Shelter charity worker reserves the right to revise the registration fee at any time. All registration fee revisions will be made via the The Canine Shelter charity worker website. Registration fee revisions are not applicable to charity workers who have already submitted their registration fee payment before the revisions are due to take effect. A charity worker's placement on a program is not confirmed until registration fee has been paid in full and availability has been checked by their The Canine Shelter charity worker Program Manager.
\nProgram Fees
\nDetails of the program fees are set out on the The Canine Shelter charity worker website and any fee revisions will be made public via that platform. Program fee revisions are not applicable to charity workers who have already paid their registration fee, unless the charity worker alters their program details after the program fee revisions have taken effect.
\nProgram fees are non-refundable. Any exceptions to this are considered on a case-by-case basis at the discretion of The Canine Shelter charity worker prior to the charity worker's start date, or at the discretion of the local team once the charity worker's program has started. All requests for program fee refunds and partial program fee refunds agreed by The Canine Shelter charity worker or the local team are subject to a cancellation fee of up to 150€, to cover administrative and transaction costs.
\ncharity workers who cancel from their program and then reinstate their program at another time are subject to program fee differences and any revisions or variations to the program costs that have occurred at the time they wish to reinstate. Program fee credits expire twenty four months after being issued, or at The Canine Shelter charity worker's discretion.
\nProgram fees are due no later than thirty days prior to the beginning of the charity worker's program placement. Failure to make this payment can result in a loss of charity worker placement with no refund of registration fee.
\nWhere a group of ten or more people is charity workering with The Canine Shelter charity worker, program fees and fees for additional services for each group member must be paid no later than thirty days before the program starts. Where a group has requested additional services such as tours as part of their itinerary, all cancellations and refunds are subject to the terms defined by the providers of these additional services.
\nChange of Dates and Duration
\nOnce registered and before they begin their trip, the charity worker is entitled to change their start date and duration once at no additional cost. Any additional changes to their start date, destination or duration after the initial free change requires payment of an administration fee of 50€ for each change. Program changes within fourteen days of the charity worker's start date will incur a late change fee of 150€. If a charity worker wishes to change their start date, the registration fee is only valid for new start dates within twelve months of the earliest start date they have been registered for.
\nThe Canine Shelter charity worker Rewards
\nThe Canine Shelter charity worker offers a 20€ referral reward for The Canine Sheltercharity workers who refer a friend or family member to charity worker with The Canine Shelter charity worker and she/he is accepted and has paid the Registration fee. Referred by The Canine Shelter charity workerS or returning charity workers, and charity workers registering on multiple The Canine Shelter charity worker programs are eligible for a 10% discount on their registration fees excluding taxes. Terms and Conditions apply to all The Canine Shelter charity worker Rewards.
\nPersonal Risks
\nThe charity worker acknowledges and accepts the responsibilities and risks associated with their choice to travel to, temporarily reside in, and provide charity worker services in a foreign country. Such travel and charity worker work can be hazardous and involves a certain degree of risk, inherently dangerous activities and personal perils to the charity worker, both foreseen and unforeseen, all of which are fully accepted by and solely assumed by the charity worker. Therefore, The Canine Shelter charity worker, including any and all of its employees, managers, directors, shareholders, host families and independent local teams, is not liable, to the maximum extent of the law, for any loss or harm the charity worker or associates may suffer, including but not limited to loss caused directly or indirectly by: Personal injury; Emotional injury; Death; Illness or disease; Damage to or loss of property; Natural disasters; Hostage situations; or War or terrorism. Indemnity
\nThe charity worker agrees to indemnify and hold harmless The Canine Shelter charity worker and the independent local team from any and all liability arising directly or indirectly out of, or in connection with, the charity worker's travel, temporary residence in their chosen destination, and the undertaking of charity workering or tourism activities.
\nAdditionally to the info mentioned above, we emphazes that, by using this site you agree to the following terms and conditions:
\nYou have decided to use this site on your own - use is optional and you can close your account at any time.
\nAny and all information that you submit and share on this Website is accurate and true.
\nAny and all information that you submit and share on this Website can be used by The Canine Shelter charity worker to facilitate connections and quality of our Services.
\nIf you are a Participating Organization hosting a charity worker, then you have read, understand, and abide 
\n\t(and will continue to abide) by our Hosting Principles and Host Guarantee of Conditions.
\nYou certify that any content, including text, photos, and files, that are attached to your account are yours, or you have adequate rights to post for public viewing.
\nAs an individual interested in charity workering, you understand that
\nIn order to register for the Website and explore charity workering Programs, you hereby agree to review, sign and submit to The Canine Shelter charity worker' Accident Waiver and Release of Liability .
\nYou will not hold The Canine Shelter charity worker liable for connections made on our platform as The Canine Shelter charity worker does not verify or endorse any people, organizations, projects, or listing on our platform.
\nWhen you applied for a program you will conduct yourself professionally and lawfully on our platform. In connection with your use of The Canine Shelter charity worker, you may not and you agree that you will not:
\n- Use The Canine Shelter charity worker for any commercial or other purposes that are not expressly permitted by these Terms and Conditions;
\n- Copy, store, or otherwise access any information contained on The Canine Shelter charity worker for purposes not expressly permitted by these Terms;
\n- Infringe the rights of any person or entity, including without limitation, their intellectual property, privacy, publicity or contractual rights;
\n- Interfere with or damage The Canine Shelter charity worker 
\n\t(our website, address, phone, email, online content, social media profiles, and other public content), including, without limitation, through the use of viruses, cancel bots, Trojan horses, harmful code, flood pings, denial-of-service attacks, packet or IP spoofing, forged routing or electronic mail address information or similar methods or technology;
\n- Use The Canine Shelter charity worker to transmit, distribute, post or submit any information concerning any other person or entity, including without limitation, photographs of others without their permission, personal contact information or credit, debit, calling card or account numbers;
\n- Use The Canine Shelter charity worker in connection with the distribution of unsolicited commercial email («spam») or advertisements;
\n- Stalk or harass any other user of our Website or Services or collect or store any personally identifiable information about any other user;
\n- Offer, as a person, any skills, time, expertise, or other work that you are not qualified to provide;
\n- Register for more than one The Canine Shelter charity worker Account or register for a The Canine Shelter charity worker Account on behalf of an individual other than yourself;
\n- Contact another charity worker or Participating Organization for any purpose other than asking a question related to the charity workering experience;
\n- Impersonate any person or entity, or falsify or otherwise misrepresent yourself or your affiliation with any person or entity;
\n- Use automated scripts to collect information or otherwise interact with The Canine Shelter charity worker;
\n- Use The Canine Shelter charity worker to find a charity workering experience and then pursue said project independent of The Canine Shelter charity worker in order to circumvent the obligation to pay any fees related to The Canine Shelter charity worker' services;
\n- As a charity worker, submit any information that is not true or that you will not honor; or post, upload, publish, submit or transmit any Content that: 
\n\t(i) infringes, misappropriates or violates a third party's patent, copyright, trademark, trade secret, moral rights or other intellectual property rights, or rights of publicity or privacy; 
\n\t(ii) violates, or encourages any conduct that would violate any applicable law or regulation or would give rise to civil liability; 
\n\t(iii) is fraudulent, false, misleading or deceptive; 
\n\t(iv) is defamatory, obscene, pornographic, vulgar or offensive; 
\n\t(v) promotes discrimination, bigotry, racism, hatred, harassment or harm against any individual or group; 
\n\t(vi) is violent or threatening or promotes violence or actions that are threatening to any other person; or 
\n\t(vii) promotes illegal or harmful activities or substances;
\n- Use, display, mirror or frame The Canine Shelter charity worker or any individual element within The Canine Shelter charity worker, The Canine Shelter charity worker' name, any The Canine Shelter charity worker trademark, logo or other proprietary information, or the layout and design of any page or form contained on a page, without The Canine Shelter charity worker' express written consent;
\n- Access, tamper with, or use non-public areas of The Canine Shelter charity worker, The Canine Shelter charity worker' computer systems, or the technical delivery systems of The Canine Shelter charity worker' providers;
\n- Attempt to probe, scan, or test the vulnerability of any The Canine Shelter charity worker system or network or each any security or authentication measures;
\n- Avoid, bypass, remove, deactivate, impair, descramble, or otherwise circumvent any technological measure implemented by The Canine Shelter charity worker or any of The Canine Shelter charity worker' providers or any other third party 
\n\t(including another user) to protect The Canine Shelter charity worker;
\n- Forge any TCP/IP packet header or any part of the header information in any email or newsgroup posting, or in any way use the Site, Services, Application or Collective Content to send altered, deceptive or false source-identifying information;
\n- Attempt to decipher, decompile, disassemble or reverse engineer any of the software used to provide the Site, Services, Application or Collective Content; or
\n- Advocate, encourage, or assist any third party in doing any of the foregoing.
`}
                        </span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleSubmitForm} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
})