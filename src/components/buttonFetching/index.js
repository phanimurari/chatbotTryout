const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const userId = 1
const name = 'phani'
const enrolPlans = 'CCBP'
const gender = 'male'
const email = 'imphanimurari1@gmail.com'

class FreshBotModel {
  freshBotInitializeStatus: APIStatus

  constructor() {
    this.freshBotInitializeStatus = apiStatusConstants.initial
  }

  initFreshBot = () => {
    const userEnrollPlans = this.getEnrollPlans(enrolPlans)
    const userGender = gender || 'NA'
    const userEmail = email || '-'

    this.freshBotInitializeStatus = apiStatusConstants.inProgress
    window.Freshbots.initiateWidget(
      {
        autoInitChat: false,
        getClientParams: function () {
          return {
            'sn::cstmr::id': userId,
            'cstmr::nm': name,
            'cstmr::eml': userEmail,
            'cstmr::xtrInfrmtn:Gender': userGender,
            'cstmr::xtrInfrmtn:Enroll_Plans': userEnrollPlans,
            'cstmr::xtrInfrmtn:User_Id': userId,
          }
        },
      },
      successResponse => {
        if (this.freshBotInitializeStatus === apiStatusConstants.inProgress) {
          window.Freshbots.showWidget(true)
        }
        this.freshBotInitializeStatus = apiStatusConstants.success
      },
      errorResponse => {
        this.freshBotInitializeStatus = apiStatusConstants.failure
      },
    )
  }

  getEnrollPlans(enrolPlans) {
    if (enrolPlans && enrolPlans.length > 0) {
      return enrolPlans.join()
    }
    return noEnrollPlans
  }

  openFreshBotWidget = () => {
    const fcBotElement = document.getElementById('spd-busns-spt')
    if (
      (this.freshBotInitializeStatus === apiStatusConstants.initial ||
        this.freshBotInitializeStatus === apiStatusConstants.failure) &&
      window.Freshbots
    ) {
      this.initFreshBot(userId, name, enrolPlans, gender, email)
    } else if (fcBotElement && fcBotElement.style.display === 'none') {
      window.Freshbots.showWidget(true)
    } else if (fcBotElement && fcBotElement.style.display === 'block') {
      window.Freshbots.hideWidget()
    }
  }

  onClickFreshChatSupport = () => {
    if (!document.getElementById('spd-busns-spt')) {
      loadFreshBotScript(() => {
        this.openFreshBotWidget(userId, name, enrolPlans, gender, email)
      })
    } else {
      this.openFreshBotWidget(userId, name, enrolPlans, gender, email)
    }
  }
}

export default FreshBotModel
