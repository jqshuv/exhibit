import ModalComp from "@/components/ModalComp";
import NavbarComp from "@/components/NavbarComp";
import initPocketBase from "@/utils/initPocketbase";
import navigation from "@/utils/navigation";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home({ isLoggedIn, authData, notifications, job_categories, jobs, reopenObject } : any) {
  const [showMyCoolModal, setShowMyCoolModal] = useState(false)
  const [currentJob, setCurrentJob] = useState({})

  console.log(reopenObject)

  function openModal(job: any) {
    setCurrentJob(job)
    setShowMyCoolModal(true)
  }

  useEffect(() => {
    if (reopenObject) {
      openModal(reopenObject)
    }
  }, [reopenObject])



  return (
    <div>
      <NavbarComp isLoggedIn={isLoggedIn} authData={authData} notifications={notifications} navigation={navigation("home")} />

      {/* <NewWindow>
        <h1>Hallo</h1>
      </NewWindow> */}


      <ModalComp
        show={showMyCoolModal} //refences our useState, so modal knows when to show
        setShow={setShowMyCoolModal} //same as above, but for changing values
        job={currentJob} //passing in the job object
        isLoggedIn={isLoggedIn} //passing in the isLoggedIn value
      />
      
    <div className="relative sm:rounded-lg mx-auto max-w-7xl px-5 py-5 sm:px-20 sm:py-14">
      {job_categories.map((job_category: any) => (
        <div className="relative shadow-md overflow-x-auto sm:rounded-lg mb-4" key={job_category.id} >
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                {job_category.category}
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Job Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Remote
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
              </thead>
              <tbody>
                  {jobs.map((job: any) => (
                    <>
                      {(job.category[0] === job_category.id) && (
                        <tr className="bg-white border-t dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {job.job}
                          </th>
                          <td className="px-6 py-4">
                            <Link href={job.expand.location.href} target="_blank">
                              <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{job.expand.location.location}</span>
                            </Link>
                          </td>
                          {job.remote === 'full' ? (
                            <td className="px-6 py-4">
                              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Full</span>
                            </td>
                          ) : (
                            <>
                              {job.remote === 'partial' ? (
                                <td className="px-6 py-4">
                                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Partial</span>
                                </td>
                              ) : (
                                <td className="px-6 py-4">
                                  <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Nope</span>
                                </td>
                              )}
                            </>
                          )}
                          {job.status === 'open' ? (
                            <td className="px-6 py-4">
                              <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                  <span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
                                  Open
                              </span>
                            </td>
                          ) : (
                            <>
                              {job.status === 'asked' ? (
                                <td className="px-6 py-4">
                                  <span className="inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                    <span className="w-2 h-2 mr-1 bg-yellow-500 rounded-full"></span>
                                    Asked
                                  </span>
                                </td>
                              ) : (
                                <td className="px-6 py-4">
                                  <span className="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                                    <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                                    Closed
                                  </span>
                                </td>
                              )}
                            </>
                          )}

                          {job.status === 'closed' ? (
                                <td className="px-6 py-4 text-right">
                                  <button disabled className="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">Info</button>
                                </td>
                              ) : (
                                <td className="px-6 py-4 text-right">
                                  <button onClick={() => openModal(job)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">Info</button>
                                </td>
                              )}
                        </tr>
                      )}
                    </>
                  ))}
              </tbody>
          </table>
      </div>

      ))}


      
    </div>


      {/* <div>
          <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700"></label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        <img src={session?.user.image} alt="" />
                      </span>
                      <input type="file" name="file" onChange={(e) => handleUpload(e)} />
                    </div>
                  </div>

                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
          </div>
        </div> */}
      </div>
  )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Init PocketBase
  const pb = await initPocketBase(context);

  const authData = JSON.parse(JSON.stringify(pb.authStore));
  const notifications = JSON.parse(JSON.stringify(await pb.collection('notifications').getFullList()));
  const job_categories = JSON.parse(JSON.stringify(await pb.collection('job_categories').getFullList()));
  const jobs = JSON.parse(JSON.stringify(await pb.collection('jobs').getFullList(200, { expand: 'location' })));

  let reopenObject = null;

  if (context.query.reopen == 'true' && context.query.mdljob) {

    if (typeof context.query.mdljob === 'object') {
      context.query.mdljob = context.query.mdljob[0];
    }

    reopenObject = JSON.parse(JSON.stringify(await pb.collection('jobs').getOne(context.query.mdljob, { expand: 'location' })));
  }


  // Return the props if the correct language is set
  return {
    props: {
      isLoggedIn: pb.authStore.isValid,
      authData: authData.baseModel,
      notifications: notifications,
      job_categories: job_categories,
      jobs: jobs,
      reopenObject: reopenObject,
    },
  };
}
