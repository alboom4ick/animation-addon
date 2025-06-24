// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   meet,
//   MeetSidePanelClient,
// } from '@googleworkspace/meet-addons/meet.addons';
// import {
//   ACTIVITY_SIDE_PANEL_URL,
//   CLOUD_PROJECT_NUMBER,
//   MAIN_STAGE_URL,
// } from '../../shared/constants';


// /**
//  * @see {@link https://developers.google.com/meet/add-ons/guides/overview#side-panel}
//  */
// export default function Page() {
//   const [sidePanelClient, setSidePanelClient] = useState<MeetSidePanelClient>();
//   const [error, setError] = useState<string>();

//   /**
//    * Starts the add-on activity and passes the selected color to the Main Stage,
//    * as part of the activity starting state.
//    */
//   async function startCollaboration(e: unknown) {
//     try {
//       if (!sidePanelClient) {
//         throw new Error('Side Panel is not yet initialized!');
//       }

//       const startingColor = (
//         document.getElementById('starting-color')! as HTMLInputElement
//       ).value;
//       await sidePanelClient.startActivity({
//         mainStageUrl: MAIN_STAGE_URL,
//         sidePanelUrl: ACTIVITY_SIDE_PANEL_URL,
//         // Pass the selected color to customize the initial display.
//         additionalData: `{\"startingColor\": \"${startingColor}\"}`,
//       });
//       window.location.replace(ACTIVITY_SIDE_PANEL_URL + window.location.search);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to start collaboration');
//       console.error('Failed to start collaboration:', err);
//     }
//   }

//   useEffect(() => {
//     /**
//      * Initializes the Add-on Side Panel Client.
//      * https://developers.google.com/meet/add-ons/reference/websdk/addon_sdk.meetsidepanelclient
//      */
//     async function initializeSidePanelClient() {
//       try {
//         console.log('Initializing with cloud project number:', CLOUD_PROJECT_NUMBER);
//         const session = await meet.addon.createAddonSession({
//           cloudProjectNumber: CLOUD_PROJECT_NUMBER,
//         });
//         const client = await session.createSidePanelClient();
//         setSidePanelClient(client);
//       } catch (err) {
//         setError(err instanceof Error ? err.message : 'Failed to initialize side panel');
//         console.error('Failed to initialize side panel:', err);
//       }
//     }
//     initializeSidePanelClient();
//   }, []);

//   return (
//     <>
//       <div>
//         Welcome to Pretty Colors! This is a contrived demo add-on that lets you
//         look at an animation involving your favorite color.
//       </div>
//       {error && (
//         <div style={{ color: 'red', margin: '10px 0' }}>
//           Error: {error}
//         </div>
//       )}
//       <label htmlFor="starting-color">
//         Pick a color you like. Everyone will see this:
//       </label>
//       <input
//         aria-label="Color picker for animation in main stage"
//         type="color"
//         id="starting-color"
//         name="starting-color"
//         defaultValue="#00ff00"
//       />
//       <br />
//       <button
//         aria-label="Launch activity for all participants"
//         onClick={startCollaboration}
//       >
//         Start activity
//       </button>
//     </>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import {
    meet,
    MeetSidePanelClient,
} from '@googleworkspace/meet-addons/meet.addons';


export default function Page() {
    const [sidePanelClient, setSidePanelClient] = useState<MeetSidePanelClient>();

    // Launches the main stage when the main button is clicked.
    async function startActivity(e: unknown) {
        if (!sidePanelClient) {
            throw new Error('Side Panel is not yet initialized!');
        }
        await sidePanelClient.startActivity({
            mainStageUrl: 'https://main.d3gqjbszxtvv4a.amplifyapp.com/mainstage',
            additionalData: JSON.stringify({
        })
    });

    /**
     * Prepares the add-on Side Panel Client.
     */
    useEffect(() => {
        (async () => {
            const session = await meet.addon.createAddonSession({
                cloudProjectNumber: '109731201886',
            });
            setSidePanelClient(await session.createSidePanelClient());
        })();
    }, []);

    return (
        <>
            <div>
                This is the add-on Side Panel. Only you can see this.
            </div>
            <button onClick={startActivity}>
                Launch Activity in Main Stage.
            </button>
        </>
    );
}
}