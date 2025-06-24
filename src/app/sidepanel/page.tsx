'use client';

import { useEffect, useState } from 'react';
import {
  meet,
  MeetSidePanelClient,
} from '@googleworkspace/meet-addons/meet.addons';
import {
  ACTIVITY_SIDE_PANEL_URL,
  CLOUD_PROJECT_NUMBER,
  MAIN_STAGE_URL,
} from '../../shared/constants';


/**
 * @see {@link https://developers.google.com/meet/add-ons/guides/overview#side-panel}
 */
export default function Page() {
  const [sidePanelClient, setSidePanelClient] = useState<MeetSidePanelClient>();
  const [error, setError] = useState<string>();

  /**
   * Starts the add-on activity and passes the selected color to the Main Stage,
   * as part of the activity starting state.
   */
  async function startCollaboration(e: unknown) {
    try {
      if (!sidePanelClient) {
        throw new Error('Side Panel is not yet initialized!');
      }

      const startingColor = (
        document.getElementById('starting-color')! as HTMLInputElement
      ).value;
      await sidePanelClient.startActivity({
        mainStageUrl: 'https://master.d3jesgto843lwi.amplifyapp.com/mainstage',
        sidePanelUrl: 'https://master.d3jesgto843lwi.amplifyapp.com/activitysidepanel',
        // Pass the selected color to customize the initial display.
        additionalData: `{\"startingColor\": \"${startingColor}\"}`,
      });
      window.location.replace("https://master.d3jesgto843lwi.amplifyapp.com/activitysidepanel" + window.location.search);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start collaboration');
      console.error('Failed to start collaboration:', err);
    }
  }

  useEffect(() => {
    /**
     * Initializes the Add-on Side Panel Client.
     * https://developers.google.com/meet/add-ons/reference/websdk/addon_sdk.meetsidepanelclient
     */
    async function initializeSidePanelClient() {
      try {
        console.log('Initializing with cloud project number:', CLOUD_PROJECT_NUMBER);
        const session = await meet.addon.createAddonSession({
          cloudProjectNumber: CLOUD_PROJECT_NUMBER || "109731201886",
        });
        const client = await session.createSidePanelClient();
        setSidePanelClient(client);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize side panel');
        console.error('Failed to initialize side panel:', err);
      }
    }
    initializeSidePanelClient();
  }, []);

  return (
    <>
      <div>
        Welcome to Pretty Colors! This is a contrived demo add-on that lets you
        look at an animation involving your favorite color.
      </div>
      {error && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          Error: {error}
        </div>
      )}
      <label htmlFor="starting-color">
        Pick a color you like. Everyone will see this:
      </label>
      <input
        aria-label="Color picker for animation in main stage"
        type="color"
        id="starting-color"
        name="starting-color"
        defaultValue="#00ff00"
      />
      <br />
      <button
        aria-label="Launch activity for all participants"
        onClick={startCollaboration}
      >
        Start activity
      </button>
    </>
  );
}
