// Blog posts (English), newest first. Mirrors blog-data.js.
module.exports = [
{
  slug: 'blog-control-screens',
  title: 'Control and monitoring screens',
  date: 'February 28, 2022', iso: '2022-02-28',
  cat: 'tips', catLabel: 'Tips & tricks',
  cover: 'images/control-cover.webp',
  excerpt: 'Almost every business process needs a clear, sharp way to show data to users and managers. Here is how to build a rotating display screen in the Portal Builder.',
  body: `
<p>Almost every business process eventually needs a clear, sharp way to present data to users and managers. Dedicated screens that show the essence of your business information are part of continuously improving workflows and controls.</p>
<p>A large screen in the service department showing open calls, a chart of warehouse tasks in progress for the warehouse manager, and much more – this is exactly what the Portal Builder and its rotating display mode were created for.</p>
<figure><img src="images/control-screen.webp" alt="Rotating display screen" loading="lazy"></figure>
<p>Rotating display screens are designed to present information clearly: records refresh automatically and rotate on screen at a set pace ("departure board" mode). It's a highly effective way to show data on display screens in the warehouse, at the service center or on managers' workstations.</p>
<h2>Setting up a rotating display screen</h2>
<ul>
  <li>Define the screen's columns, query conditions and so on – just like any regular screen.</li>
  <li>In the dedicated sub-screen <b>"Rotating display screen settings"</b>, define 2 parameters:
    <ul>
      <li><b>Records per page</b> – how many records are shown on each page.</li>
      <li><b>Page interval (seconds)</b> – how long records are shown before moving to the next page.</li>
    </ul>
  </li>
  <li>Data is reloaded at the start of each page cycle. For example, with 20 service calls displayed 10 per page, a new query runs only after all 20 calls have been shown.</li>
</ul>
<h2>Good to know</h2>
<ul>
  <li>On a rotating display screen, you can't click a record to open its detailed view.</li>
  <li>The total number of records is shown at the top of the page.</li>
  <li>We recommend displaying the browser in full-screen mode (<span>F11</span>).</li>
  <li>You can set up several tabs with different data and rotate between them automatically using standard browser extensions.</li>
</ul>
<p class="signoff">Good luck,<br>Softsolutions</p>`
},
{
  slug: 'blog-wizard-mode',
  title: 'Wizard mode',
  date: 'February 9, 2022', iso: '2022-02-09',
  cat: 'tips', catLabel: 'Tips & tricks',
  cover: 'images/wizard-cover.webp',
  excerpt: 'Often we want the process of creating a document with a customer to be structured – step by step. That is exactly what the "Wizard" flag is for.',
  body: `
<p>When working with customers, we often want the document creation process to be structured. For example, we may want customers to first fill in the service call header, only then type a description of the issue in the free-text screen, upload an attachment – and finally complete the process in an orderly way.</p>
<h2>The "Wizard" flag</h2>
<p>That is exactly what the <b>"Wizard"</b> flag in the screen and column management screen is for. When a parent screen is marked with this flag, the system lets users move between the document header and its sub-screens only in display order, opening a new tab at each step with the <b>"Next"</b> button.</p>
<p>Here is a service call screen with 2 sub-screens in regular mode:</p>
<figure><img src="images/wizard-regular.webp" alt="Service call screen in regular mode" loading="lazy"><figcaption>Sub-screens are accessible directly from the document header</figcaption></figure>
<p>And here is the same screen with wizard mode turned on:</p>
<figure><img src="images/wizard-tabs.webp" alt="Service call screen in wizard mode" loading="lazy"><figcaption>Use the "Next" button to move between screens</figcaption></figure>
<p class="signoff">Good luck,<br>Softsolutions</p>`
},
{
  slug: 'blog-single-page',
  title: 'Working in single-page mode',
  date: 'February 9, 2022', iso: '2022-02-09',
  cat: 'tips', catLabel: 'Tips & tricks',
  cover: 'images/single-cover.webp',
  excerpt: 'How to show the document header, free text and attachments as one unit on a single page – a 3-step guide.',
  body: `
<p>Sometimes we want our customers to work with Priority without sub-screens, in a single-page layout instead. The builder lets you treat the document header, free-text screens and attachments screen as one unit and display them on a single page.</p>
<p>This layout is especially useful for landing pages, opening service calls, task diaries and more.</p>
<h2><span class="step-num">1</span> Build the header screen</h2>
<p>Building a single-page screen starts like any other screen in the Portal Builder: choose the Priority screen, assign it to a menu and select the columns to display on the site.</p>
<p>In this example we chose the service calls screen and selected the Details, Call Type and Customer Diagnosis Code columns for display.</p>
<h2><span class="step-num">2</span> Link the free-text and attachments sub-screens</h2>
<p>In the <b>"Sub-screen management"</b> sub-screen, link the screens to display. For the service call, for example, we selected the "Problem description" and "Attachments" sub-screens.</p>
<div class="note"><b>Note:</b> Each of these screens must be defined separately in the "Screen and column management" screen, where you also choose which fields the customer sees.</div>
<p>At this stage, the service call page looks like any screen that shows its sub-screens as tabs:</p>
<figure><img src="images/wizard-tabs.webp" alt="Service call screen in regular view" loading="lazy"><figcaption>Service call screen in regular view</figcaption></figure>
<h2><span class="step-num">3</span> Set up the single-page layout</h2>
<p>Go back to the service call's "Sub-screen management" sub-screen. Some screens have a value in the "Sub-screen type" column – <b>T</b> for free-text screens and <b>F</b> for attachment screens. For these screens you can check the <b>"Display inline"</b> flag.</p>
<p>Every sub-screen marked with this flag moves to the main page, below the header screen, and is no longer shown as a tab:</p>
<figure><img src="images/single-page.webp" alt="The same screen in single-page layout" loading="lazy"><figcaption>The same screen in single-page layout</figcaption></figure>
<h2>Notes</h2>
<ul>
  <li>You can combine this technique with other sub-screens – for example, show the call's free text on the opening page while other sub-screens, such as spare parts or labor, remain tabs.</li>
  <li>In the current version, inline display is supported for free-text and attachment screens only.</li>
</ul>
<p class="signoff">Good luck,<br>Softsolutions</p>`
},
{
  slug: 'blog-version-10',
  title: "So what's new in this version?",
  date: 'April 7, 2021', iso: '2021-04-07',
  cat: 'news', catLabel: 'Product updates',
  cover: 'images/v10-cover.webp',
  excerpt: 'Welcome to version 10.0.0 of the App Builder: a new look, a new home screen, improved security and plenty of enhancements for field work.',
  body: `
<p class="lead-p">Welcome to the new version <b>10.0.0</b> of the App Builder.</p>
<p>We're happy to share the many new features in this version, developed together with all of our customers. The update will roll out automatically to the app stores in the coming days, and from there to your field teams.</p>
<h2>A new look</h2>
<figure><img src="images/v10-look.webp" alt="The app's new look" loading="lazy"></figure>
<ul>
  <li>A new, clean and consistent look across all of your organization's apps.</li>
  <li>A new card and record view that puts the focus where it belongs for efficient work.</li>
  <li>Quick buttons for instant access to sub-screens and common actions.</li>
  <li>Full support for links between screens (<span>LINK</span>) – work seamlessly without going back to menus.</li>
  <li>Better control over field placement in the view.</li>
  <li>Work environment display, including support for colors defined in Priority.</li>
</ul>
<h2>There's no place like home</h2>
<figure><img src="images/v10-home.webp" alt="The new home screen" loading="lazy"></figure>
<ul>
  <li>A new, intuitive home screen.</li>
  <li>Fully dynamic display of system data – based on the customer, work environment and contact.</li>
  <li>Quick-launch buttons that go straight to a work screen or a specific record.</li>
  <li>Support for customer and user messages, including read receipts, logs and more.</li>
</ul>
<h2>Fast, efficient and secure</h2>
<p><b>We added. A lot.</b> Improved login mechanisms, <span>2FA</span> security support, connection-loss alerts and better stability. Everything is now faster, with a consistent interface across all screens and a range of new features – all to make field work more efficient.</p>
<ul>
  <li>View attachments and documents inside the app, with no additional software.</li>
  <li>Improved support for customer questionnaires, including quick navigation and several display layouts.</li>
  <li>A completely new actions menu that brings everything important into one place.</li>
  <li>Quick actions, plus/minus buttons for quantity fields and auto-save.</li>
  <li>Free-text formatting support, including previous texts and editing existing text.</li>
  <li>Improved image display.</li>
  <li>Automatic focus on the last record.</li>
</ul>
<figure><img src="images/v10-more.webp" alt="More capabilities in the new version" loading="lazy"></figure>
<p class="signoff">Best regards,<br>Softsolutions</p>`
},
{
  slug: 'blog-weshoes',
  title: 'The App Builder at WeShoes',
  date: 'November 15, 2020', iso: '2020-11-15',
  cat: 'stories', catLabel: 'Customer stories',
  cover: 'images/weshoes-cover.webp',
  excerpt: 'Softsolutions completed the rollout of its app and customer website builder at New Cinema – including SMS ordering with no app to install.',
  body: `
<p>Softsolutions Ltd. recently completed the rollout of its app and customer website builder at New Cinema.</p>
<p>The project delivered several apps for the company's employees, plus a mechanism that texts the company's customers so they can place orders from their phones – no app installation required.</p>
<blockquote>
  <p>Before the system went live, our offices were flooded with phone calls from field staff asking for information. Today everyone generates the report or views the data they need on their own.</p>
  <p>Beyond saving time, our field agents give their customers better service, including tracking packages on their way to the store and to end customers. The calls about simple things that wasted valuable time have almost completely disappeared.</p>
  <p>We also used the system to collect information from employees of companies we have product contracts with – through a landing page sent to those employees directly by SMS.</p>
  <p>There isn't a single department that the App Builder hasn't moved forward – from giving customers access to their own data to entering orders directly into our Priority system.</p>
  <cite>Nadav Kirshner, IT Manager, New Cinema</cite>
</blockquote>
<blockquote>
  <p>On one hand, the project let New Cinema's customers define product baskets for each of their employees directly in New Cinema's Priority system. On the other, it gave instant SMS access through which every employee of those customers can order their products – while fully preserving system controls and complying with customer contracts.</p>
  <p>The entire implementation went smoothly and quickly, using all the business logic already in New Cinema's Priority system, with no custom development needed.</p>
  <cite>Elad Lagun, CEO, Softsolutions</cite>
</blockquote>`
},
{
  slug: 'blog-generator-launch',
  title: 'The builder is here',
  date: 'November 11, 2020', iso: '2020-11-11',
  cat: 'news', catLabel: 'Product updates',
  cover: 'images/gen-app-3.webp',
  excerpt: 'Turn any Priority screen into an app or a web page – no development and no interfaces – for desktop, smartphone and tablet.',
  body: `
<p class="lead-p">Turn any Priority screen into an app or a web page – no development and no interfaces – for PCs, smartphones and tablets.</p>
<ul>
  <li>Native apps for field teams.</li>
  <li>Landing pages to embed in your company website or send by SMS.</li>
  <li>Portals for a wide range of uses.</li>
  <li>A customer website for service calls, reports, orders and more.</li>
</ul>
<h2>No development, remarkably easy</h2>
<ul>
  <li>Full support for custom screens and in-house developments.</li>
  <li>No interfaces and no development.</li>
  <li>Simply choose a screen and the columns to display – and get to work.</li>
</ul>
<p>It's a Native system, so it can use every device capability: GPS, customer signatures, the camera, navigation software, voice dictation in the field and more.</p>
<p><a class="link" href="generators.html">See everything the App Builder can do</a></p>`
},
];
