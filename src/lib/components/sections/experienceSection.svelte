<script lang="ts">
  import { json, t } from 'svelte-i18n'
  import WorkShowcase from '../experience/workShowcase.svelte'
  import TabList from '../global/tabList.svelte'

  const jobs = [
    {
      id: 'binary_confidence',
      company: { title: 'Binary Confidence', link: 'https://binaryconfidence.com' },
      technologies: ['Python', 'Ansible', 'Hyper-V', 'Linux', 'Windows', 'Virtualization'],
    },
    {
      id: 'principle_guy',
      company: { title: 'Principle Guy', link: '' },
      technologies: ['Web Development', 'Mobile Development', 'Consulting'],
    },
  ]

  let activeSectionIndex = $state(0)

  function handleSectionChange(selectedTitle: string) {
    const index = jobs.findIndex(job => job.company.title === selectedTitle)
    if (index !== -1) {
      activeSectionIndex = index
    }
  }

  const currentJob = $derived({
    role: $t(`experience.job_history.${jobs[activeSectionIndex].id}.role`) || '',
    company: jobs[activeSectionIndex].company,
    range: $t(`experience.job_history.${jobs[activeSectionIndex].id}.range`) || '',
    technologies: jobs[activeSectionIndex].technologies,
    bulletPoints: ($json(`experience.job_history.${jobs[activeSectionIndex].id}.bulletPoints`) as string[]) || [],
  })
</script>

<section id="experience">
  <h2 class=" text-left">{$t('experience.title')}</h2>
  <div class="mt-6 ml-auto flex flex-col gap-x-10 max-md:space-y-8 md:mt-10 md:flex-row md:px-10">
    <TabList
      options={jobs.map(job => job.company.title)}
      selectedIndex={activeSectionIndex}
      onSelectionChange={handleSectionChange}
    />
    <WorkShowcase work={currentJob} />
  </div>
</section>
