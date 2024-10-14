// Copyright (c) 2023 QueLabs
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import NavbarComp from "@/components/NavbarComp";
import initPocketBase from "@/utils/initPocketbase";
import navigation from "@/utils/navigation";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import DatePicker from "tailwind-datepicker-react"
import PocketBase from "pocketbase";
import { useRouter } from "next/router";
import OnboardingNavbar from "@/components/apply/OnboardingNavbar";
import Link from "next/link";
import { PaperClipIcon } from "@heroicons/react/24/outline";

export default function ApplyOnboardPage({ isLoggedIn, authData, notifications, stepVar, cookies, jobId, jobData, runningApllication } : any) {	
  const [show, setShow] = useState<boolean>(false)
  const [step, setStep] = useState<number>(Number(stepVar))
  const [bornDate, setBornDate] = useState<Date>(new Date(1990, 0, 1))
  const router = useRouter();

  const openInNewTab = (url: string | URL) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  } 

  useEffect(() => {
    router.query.step !== step.toString() && router.replace({ query: { ...router.query, step: step } });
    // runningApllication.applicationRunning && runningApllication.application.sent && openInNewTab(`${process.env.NEXT_PUBLIC_API_URL}/api/files/wh29zlacw7nvxce/w4mfwwf85dzy75o/rick_astley_never_gonna_give_you_up_9wx4rYdUig.mp4`)
    runningApllication.applicationRunning && runningApllication.application.sent && setStep(4)
    runningApllication.applicationRunning && runningApllication.application.born && setBornDate(new Date(runningApllication.application.born)) 
    !runningApllication.applicationRunning && step != 1 && setStep(1)
  },[router, runningApllication, step])

  const options = {
		autoHide: true,
		todayBtn: false,
		clearBtn: false,
    defaultDate: bornDate,
	}

  async function resetEvent(e: any) {
    e.preventDefault();
    const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);
    pb.authStore.loadFromCookie(cookies);

    const applicationsList = await pb.collection('applications').getFullList()
    if (applicationsList.length > 0) {
      pb.collection('applications').delete(applicationsList[0].id)
    }

    setStep(1)
  }

  async function step2Submit(e: any) {
    e.preventDefault();
    const newApplication = e.target.applicationupload.files[0];
    const newCV = e.target.cvupload.files[0];

    const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL);
    pb.authStore.loadFromCookie(cookies);

    const formData = new FormData();
    newApplication && formData.append('application', newApplication);
    newCV && formData.append('cv', newCV);

    const applicationsList = await pb.collection('applications').getFullList()

    if (applicationsList.length < 1) {
      setStep(1)
    } else {
       pb.collection('applications').update(applicationsList[0].id, formData).then((res: any) => {
        setStep(3)
      })
    }
  }

  async function step1Submit(e: any) {
    e.preventDefault()
    const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL)
    pb.authStore.loadFromCookie(cookies)

    const data : any = {
      firstname: e.target.firstname.value,
      lastname: e.target.lastname.value,
      born: bornDate,
      job: jobId,
      status: "pending",
    }
    const applicationsList = await pb.collection('applications').getFullList()

    if (applicationsList.length < 1) {
      data['user'] = authData.id

      pb.collection('applications').create(data).then((res: any) => {
        setStep(2)
      })
    } else {
       pb.collection('applications').update(applicationsList[0].id, data).then((res: any) => {
        setStep(2)
      })
    }
  }

  async function step3Submit(e: any) {
    e.preventDefault()
    const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL)
    pb.authStore.loadFromCookie(cookies)

    const data : any = {
      sent: true,
    }

    const applicationsList = await pb.collection('applications').getFullList()

    if (applicationsList.length < 1) {
      setStep(1)
    } else {
      pb.collection('applications').update(applicationsList[0].id, data).then((res: any) => {
        setStep(4)
      })
    }
  }

  if (step == 4) {
    return (
      <div>
        <NavbarComp isLoggedIn={isLoggedIn} authData={authData} notifications={notifications} navigation={navigation("home")} />

        <div className="grid min-h-full place-items-center py-24 px-6 sm:py-32 lg:px-8">
            <div className="text-center">
              <p className="text-base font-semibold text-green-600">APPLICATION SUMBITTED</p>
              <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">Your Application is done!</h1>
              <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">You can now take a nap, if you want :)</p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/"
                  className="rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Go back home
                </Link>
              </div>
            </div>
        </div>
      </div>
    )
  }

  
  if (step == 3 && runningApllication.applicationRunning) {
    return (
      <div>
        <NavbarComp isLoggedIn={isLoggedIn} authData={authData} notifications={notifications} navigation={navigation("home")} />

        <div className="relative overflow-x-visible sm:rounded-lg px-5 py-3 sm:px-20 sm:py-14">
          <OnboardingNavbar step={step} />
          <form onSubmit={(e) => step3Submit(e)}>
              {/* <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Application Overview</h3> */}
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Applicant Information</h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-500">
                  <dl>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full name</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-white">{runningApllication.application ? runningApllication.application.firstname || null : null} {runningApllication.application ? runningApllication.application.lastname || null : null}</dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Application ID</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-white">{runningApllication.application ? runningApllication.application.id || null : null}</dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full name</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-white">{runningApllication.application ? runningApllication.application.firstname || null : null} {runningApllication.application ? runningApllication.application.lastname || null : null}</dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Birthdate</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-white">{runningApllication.application ? runningApllication.application.born || null : null}</dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Attachments <small><small>(Application & CV)</small></small></dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 dark:text-white">
                        <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200 dark:border-gray-500">
                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                              <span className="ml-2 w-0 flex-1 truncate">{runningApllication.application.application || "none"}</span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/files/applications/${runningApllication.application.id}/${runningApllication.application.application}`} target="_blank" rel="noreferrer" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Download
                              </a>
                            </div>
                          </li>
                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                              <span className="ml-2 w-0 flex-1 truncate">{runningApllication.application.cv || "none"}</span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a href={`${process.env.NEXT_PUBLIC_API_URL}/api/files/applications/${runningApllication.application.id}/${runningApllication.application.cv}`} target="_blank" rel="noreferrer" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Download
                              </a>
                            </div>
                          </li>
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
              <div className="sm:flex sm:flex-row-reverse">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Submit
                </button>
                <button onClick={resetEvent} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 sm:mr-2">
                  Cancel
                </button>
                <button onClick={() => setStep(2)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mr-2">
                  Previous Step
                </button>
              </div>
          </form>
        </div>
      </div>
    )
  }



  if (step == 2 && runningApllication.applicationRunning) {
    return (
      <div>
        <NavbarComp isLoggedIn={isLoggedIn} authData={authData} notifications={notifications} navigation={navigation("home")} />

        <div className="relative overflow-x-visible sm:rounded-lg px-5 py-3 sm:px-20 sm:py-14">
          <OnboardingNavbar step={step} />

          <form onSubmit={(e) => step2Submit(e)}>
              <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Invoice details</h3>
              <div className="grid gap-4 mb-4 sm:grid-cols-1">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload your Apply</label>
                  <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" accept=".pdf,.doc,.docx,.xls,.xlsx" aria-describedby="file_input_help" id="applicationupload" type="file" />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload your CV</label>
                  <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" accept=".pdf,.doc,.docx,.xls,.xlsx" aria-describedby="file_input_help" id="cvupload" type="file" />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                </div>
              </div>
              <div className="sm:flex sm:flex-row-reverse">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Next Step
                </button>
                <button onClick={resetEvent} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 sm:mr-2">
                  Cancel
                </button>
                <button onClick={() => setStep(1)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:mr-2">
                    Previous Step
                </button>
              </div>
          </form>
        </div>
      </div>
    )
  }


  return (
    <div className="">
      <NavbarComp isLoggedIn={isLoggedIn} authData={authData} notifications={notifications} navigation={navigation("home")} />

      <div className="relative overflow-x-visible sm:rounded-lg px-5 py-3 sm:px-20 sm:py-14">
        <OnboardingNavbar step={step} />

        <form onSubmit={(e) => step1Submit(e)}>
            <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Invoice details</h3>
            <div className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
              <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium"><b>JOB:</b></span> { jobData.job } | { jobData.expand.location.location } | <small>{ jobData.updated }</small>
              </div>
            </div>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Firstname</label>
                <input type="text" name="firstname" id="firstname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Max" defaultValue={runningApllication.application ? runningApllication.application.firstname || null : null} required />
              </div>
              <div>
                <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lastname</label>
                <input type="text" name="lastname" id="lastname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mustermann" defaultValue={runningApllication.application ? runningApllication.application.lastname || null : null} required />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthdate</label>
                <div className="relative mb-12 w-full">
                  <DatePicker onChange={setBornDate}  show={show} setShow={(state) => setShow(state)} options={options} classNames="absolute" />
                </div>
              </div>                        
              {/* <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input type="password" name="confirm-password" id="confirm-password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
              </div> */}
            </div>
            <div className="sm:flex sm:flex-row-reverse">
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Next Step
              </button>
              <button onClick={resetEvent} type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 sm:mr-2">
                Cancel
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pb = await initPocketBase(context);

  const authData = JSON.parse(JSON.stringify(pb.authStore));
  const notifications = JSON.parse(JSON.stringify(await pb.collection('notifications').getFullList()));
  const runningApllication = JSON.parse(JSON.stringify(await pb.collection('applications').getFullList()));
  const applicationRunning = runningApllication.length > 0 ? true : false;

  console.log(runningApllication)

  if (typeof context.query.job === 'object') {
    context.query.job = context.query.job[0];
  }

  const jobData = JSON.parse(JSON.stringify(await pb.collection('jobs').getOne(context.query.job, { expand: 'location' })));


  const step = context.query.step || 1;

  return {
    props: {
      isLoggedIn: pb.authStore.isValid,
      authData: authData.baseModel,
      notifications: notifications,
      stepVar: step,
      cookies: context.req.headers.cookie || '',
      jobId: context.query.job || null,
      jobData: jobData,
      runningApllication: applicationRunning ? { applicationRunning: applicationRunning, application: runningApllication[0] } : { applicationRunning: applicationRunning, application: null },
    },
  };
}
