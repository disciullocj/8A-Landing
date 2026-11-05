const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));
const demoDialog = document.querySelector('#demo-dialog');
document.querySelectorAll('[data-demo]').forEach(button => button.addEventListener('click', () => demoDialog.showModal()));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
});
const infoDialog = document.querySelector('#info-dialog');
function showInfo(title, text) {
  document.querySelector('#info-title').textContent = title;
  document.querySelector('#info-text').textContent = text;
  infoDialog.showModal();
}
document.querySelector('[data-login]').addEventListener('click', () => showInfo('Your 8Assist workspace', 'This recreated landing page is a preview. Account sign-in will be available when your organization’s workspace is connected.'));
document.querySelectorAll('[data-policy]').forEach(button => button.addEventListener('click', () => showInfo(button.dataset.policy === 'privacy' ? 'Privacy Policy' : 'Terms of Service', 'This is an independently recreated website preview. No account service is connected, and demo form information is processed only in your browser. Official legal policies must be supplied before launch.')));
document.querySelector('.edit-case').addEventListener('click', () => showInfo('A clearer view of your cases', 'You’re viewing a sample case with example data. Request a demo to explore a workspace tailored to your housing program.'));
document.querySelector('#demo-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const content = document.querySelector('#demo-content');
  content.replaceChildren();
  const icon = document.createElement('span'); icon.className = 'success-icon'; icon.textContent = '✓';
  const heading = document.createElement('h2'); heading.textContent = 'Your request is ready.';
  const text = document.createElement('p'); text.textContent = `Thanks, ${data.get('name')}. Your demo request for ${data.get('organization')} has been prepared in this browser. This preview is not connected to a booking service, so your request has not been sent.`;
  const close = document.createElement('button'); close.className = 'button'; close.textContent = 'Back to exploring →'; close.addEventListener('click', () => demoDialog.close());
  content.append(icon, heading, text, close);
});
const rowSets = {
  Overview: [['green','▧','Recertification (Annual)','Due Oct 31, 2026','›'],['peach','▧','Interim (Loss of Income)','Completed Aug 14, 2026','✓'],['purple','♙','Inspection (Unit 4B)','Scheduled Oct 26, 2026','›']],
  Documents: [['green','▧','Income verification','Added Oct 12, 2026','✓'],['peach','▧','Housing assistance application','Added Sep 28, 2026','✓'],['purple','▧','Lease agreement','Added Sep 28, 2026','✓']],
  Tasks: [['green','▧','Review recertification','Due today','›'],['peach','▧','Schedule inspection','Due Oct 26, 2026','›'],['purple','▧','Complete interim update','Assigned to your team','›']],
  History: [['green','✓','Client details updated','Oct 14, 2026','›'],['peach','✓','Income documents received','Oct 12, 2026','›'],['purple','✓','Case created','Sep 28, 2026','›']]
};
function selectTab(name) {
  document.querySelectorAll('[data-case-tab]').forEach(button => { button.classList.toggle('selected', button.dataset.caseTab === name); button.setAttribute('aria-pressed', String(button.dataset.caseTab === name)); });
  const rows = document.querySelector('#case-rows');
  rows.replaceChildren(...rowSets[name].map(([color, icon, title, subtitle, end]) => {
    const row = document.createElement('div'); row.className = 'case-row';
    const badge = document.createElement('span'); badge.className = `document ${color}`; badge.textContent = icon;
    const copy = document.createElement('span'); const strong = document.createElement('strong'); strong.textContent = title; const small = document.createElement('small'); small.textContent = subtitle; copy.append(strong,small);
    const arrow = document.createElement('b'); arrow.textContent = end; row.append(badge,copy,arrow); return row;
  }));
}
document.querySelectorAll('[data-case-tab]').forEach(button => button.addEventListener('click', () => selectTab(button.dataset.caseTab)));
const featureTabs = [...document.querySelectorAll('[data-feature]')];
function selectFeature(button) {
  featureTabs.forEach(tab => { const selected = tab === button; tab.classList.toggle('active',selected); tab.setAttribute('aria-selected',String(selected)); tab.tabIndex = selected ? 0 : -1; });
  document.querySelector('#case-preview').setAttribute('aria-labelledby',button.id);
  document.querySelector('.case-heading h3').textContent = ['A place for every detail.','Every client. A clearer picture.','Keep your next step in sight.'][button.dataset.feature];
  selectTab(['Overview','Documents','Tasks'][button.dataset.feature]);
}
featureTabs.forEach((button, index) => {
  button.tabIndex = index === 0 ? 0 : -1;
  button.addEventListener('click', () => selectFeature(button));
  button.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % featureTabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index + featureTabs.length - 1) % featureTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = featureTabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectFeature(featureTabs[next]); featureTabs[next].focus(); }
  });
});
