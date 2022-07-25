import { createSignal, JSXElement, Show } from "solid-js";
import "tippy.js/dist/tippy.css";

interface Props {
  children: JSXElement;
}

export function Layout(props: Props) {
  const [showMenu, setShowMenu] = createSignal(false);

  function toggleMenu() {
    setShowMenu((v) => !v);
  }

  return (
    <div class="h-full flex">
      <Show when={showMenu()}>
        {/* <!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. --> */}
        <div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
          {/* <!--
		Off-canvas menu backdrop, show/hide based on off-canvas menu state.
  
		Entering: "transition-opacity ease-linear duration-300"
		  From: "opacity-0"
		  To: "opacity-100"
		Leaving: "transition-opacity ease-linear duration-300"
		  From: "opacity-100"
		  To: "opacity-0"
	  --> */}
          <div
            class="fixed inset-0 bg-slate-600 bg-opacity-75"
            // transition:fade={{ duration: 300, easing: linear }}
            onClick={toggleMenu}
          />

          <div class="fixed inset-0 flex z-40 pointer-events-none">
            {/* <!--
		  Off-canvas menu, show/hide based on off-canvas menu state.
  
		  Entering: "transition ease-in-out duration-300 transform"
			From: "-translate-x-full"
			To: "translate-x-0"
		  Leaving: "transition ease-in-out duration-300 transform"
			From: "translate-x-0"
			To: "-translate-x-full"
		--> */}
            <div
              class="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none pointer-events-auto"
              // transition:fly={{
              // 	duration: 300,
              // 	easing: cubicInOut,
              // 	x: -320, // Hard-coded full width, not perfect but will do for now.
              // 	opacity: 1
              // }}
            >
              {/* <!--
			Close button, show/hide based on off-canvas menu state.
  
			Entering: "ease-in-out duration-300"
			  From: "opacity-0"
			  To: "opacity-100"
			Leaving: "ease-in-out duration-300"
			  From: "opacity-100"
			  To: "opacity-0"
		  --> */}
              <div class="absolute top-0 right-0 -mr-12 pt-4">
                <button
                  type="button"
                  class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={toggleMenu}
                  // transition:fade={{ duration: 300, easing: cubicInOut }}
                >
                  <span class="sr-only">Close sidebar</span>
                  {/* <!-- Heroicon name: outline/x --> */}
                  <svg
                    class="h-6 w-6 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div class="flex flex-1 flex-col pt-5 pb-4">
                <div class="flex-shrink-0 flex items-center px-4">
                  <span style="font-size:22px">🔥</span>
                  <span class="font-semibold ml-2">Powerbox</span>
                </div>
                <nav aria-label="Sidebar" class="mt-5 flex flex-1 flex-col">
                  <div class="px-2 space-y-1 flex flex-1 flex-col justify-between">
                    <a
                      href="/"
                      class="group p-2 rounded-md flex items-center text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    >
                      {/* <!-- Heroicon name: outline/document-text --> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mr-4 h-6 w-6 text-slate-400 group-hover:text-slate-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Tasks
                    </a>

                    <a
                      href="https://github.com/haydencleary/powerbox"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="group p-2 rounded-md flex items-center text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="mr-4 h-6 w-6 text-slate-400 group-hover:text-slate-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      Github
                    </a>
                  </div>
                </nav>
              </div>
              {/* <!-- <div class="flex-shrink-0 flex border-t border-slate-200 p-4">
					<a href="#" class="flex-shrink-0 group block">
						<div class="flex items-center">
							<div>
								<img
									class="inline-block h-10 w-10 rounded-full"
									src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
									alt=""
								/>
							</div>
							<div class="ml-3">
								<p class="text-base font-medium text-slate-700 group-hover:text-slate-900">
									Lisa Marie
								</p>
								<p class="text-sm font-medium text-slate-500 group-hover:text-slate-700">
									Account Settings
								</p>
							</div>
						</div>
					</a>
				</div> --> */}
            </div>

            <div class="flex-shrink-0 w-14" aria-hidden="true">
              {/* <!-- Force sidebar to shrink to fit close icon --> */}
            </div>
          </div>
        </div>
      </Show>

      {/* <!-- Static sidebar for desktop --> */}
      <div class="hidden lg:flex lg:flex-shrink-0">
        <div class="flex flex-col w-20">
          <div class="flex-1 flex flex-col min-h-0 overflow-y-auto bg-blue-600">
            <div class="flex flex-col flex-1">
              <div class="bg-blue-700 py-4 flex items-center justify-center">
                <span style="font-size:22px" title="Powerbox">
                  🔥
                </span>
              </div>
              <nav
                aria-label="Sidebar"
                class="py-6 flex flex-1 flex-col items-center space-y-3 justify-between"
              >
                <a
                  href="/"
                  class="flex items-center p-4 rounded-lg text-blue-200 hover:bg-blue-700"
                >
                  {/* <!-- Heroicon name: outline/document-text --> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span class="sr-only">Tasks</span>
                </a>

                <a
                  href="https://github.com/haydencleary/powerbox"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center p-4 rounded-lg text-blue-200 hover:bg-blue-700"
                >
                  <span class="sr-only">GitHub</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </nav>
            </div>
            {/* <!-- <div class="flex-shrink-0 flex pb-5">
					<a href="#" class="flex-shrink-0 w-full">
						<img
							class="block mx-auto h-10 w-10 rounded-full"
							src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
							alt=""
						/>
						<div class="sr-only">
							<p>Lisa Marie</p>
							<p>Account settings</p>
						</div>
					</a>
				</div> --> */}
          </div>
        </div>
      </div>

      <div class="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* <!-- Mobile top navigation --> */}
        <div class="lg:hidden">
          <div class="bg-blue-600 py-2 px-4 flex items-center justify-between sm:px-6">
            <div class="flex items-center">
              <span style="font-size:22px">🔥</span>
              <span class="text-white font-semibold ml-2">Powerbox</span>
            </div>
            <div>
              <button
                type="button"
                class="-mr-3 h-12 w-12 inline-flex items-center justify-center bg-blue-600 rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleMenu}
              >
                <span class="sr-only">Open sidebar</span>
                {/* <!-- Heroicon name: outline/menu --> */}
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {props.children}
      </div>
    </div>
  );
}
