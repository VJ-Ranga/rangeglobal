/* ===========================================================
   Range Global Education — content data
   Country -> University -> Program drill-down.
   Mirrors the WordPress CPT structure (Destination / University / Program)
   described in the site plan — editing this file = editing the CPTs.

   NOTE on demo data: named direct partners are based on the client source
   docs. Partner-network entries and most program-level details are realistic
   demo examples, marked sample:true, ready to replace with final client data.
   =========================================================== */
(function(){

  function malta(){
    return [
      {
        slug: 'ascencia-business-school',
        name: 'Ascencia Business School Malta',
        real: true,
        city: 'Naxxar, Malta',
        type: 'Private Business School',
        accreditation: 'Malta Further & Higher Education Authority (MFHEA) accredited',
        intakes: 'February, September',
        programs: [
          { slug:'bsc-business-management', name:'BSc (Hons) Business Management', level:'Bachelor', duration:'3 years', tuition:'€6,500 – €7,500 / year (sample range)', requirements:'A-Levels or equivalent, IELTS 6.0', intakes:'Feb, Sep', sample:true },
          { slug:'mba-international-business', name:'MBA International Business', level:'Master', duration:'1.5 years', tuition:'€8,000 – €9,000 total (sample range)', requirements:"Bachelor's degree, IELTS 6.5", intakes:'Sep', sample:true },
          { slug:'diploma-hospitality-management', name:'Diploma in Hospitality Management', level:'Diploma', duration:'1 year', tuition:'€4,500 – €5,200 (sample range)', requirements:'A/L pass or equivalent, IELTS 5.5', intakes:'Feb, Sep', sample:true }
        ]
      },
      {
        slug: 'study-world-global-college',
        name: 'Study World — Global College Malta',
        real: true,
        city: 'St Julian’s, Malta',
        type: 'Higher Education College',
        accreditation: 'MFHEA accredited',
        intakes: 'January, September',
        programs: [
          { slug:'foundation-business-it', name:'Foundation in Business & IT', level:'Foundation', duration:'8 months', tuition:'€3,800 – €4,200 (sample range)', requirements:'O/L pass, IELTS 5.0', intakes:'Jan, Sep', sample:true },
          { slug:'bsc-computer-science', name:'BSc Computer Science', level:'Bachelor', duration:'3 years', tuition:'€6,800 – €7,600 / year (sample range)', requirements:'A-Levels (Maths), IELTS 6.0', intakes:'Sep', sample:true }
        ]
      },
      {
        slug: 'learn-key-institute',
        name: 'Learn Key Institute',
        real: true,
        city: 'Sliema, Malta',
        type: 'Private Institute · Est. 1995',
        accreditation: 'MFHEA accredited',
        intakes: 'February, September',
        programs: [
          { slug:'diploma-digital-marketing', name:'Diploma in Digital Marketing', level:'Diploma', duration:'1 year', tuition:'€4,200 – €4,800 (sample range)', requirements:'A/L pass, IELTS 5.5', intakes:'Feb, Sep', sample:true },
          { slug:'advanced-diploma-it', name:'Advanced Diploma in Information Technology', level:'Diploma', duration:'18 months', tuition:'€5,400 – €6,000 (sample range)', requirements:'A/L pass (Maths preferred), IELTS 5.5', intakes:'Sep', sample:true }
        ]
      },
      {
        slug: 'vilnius-university',
        name: 'Vilnius University',
        real: true,
        city: 'Vilnius, Lithuania',
        type: 'Public University · Est. 1579',
        accreditation: 'Lithuanian Ministry of Education, Science and Sport',
        intakes: 'September',
        note: 'Filed under Europe for this demo because Lithuania sits outside the 9 named destination labels.',
        programs: [
          { slug:'bsc-computer-science-vu', name:'BSc Computer Science', level:'Bachelor', duration:'3.5 years', tuition:'€3,500 – €5,000 / year (sample range)', requirements:'A-Levels (Maths), IELTS 6.0', intakes:'Sep', sample:true }
        ]
      }
    ];
  }

  function placeholderUni(name, note, subjects){
    var base = name.toLowerCase().replace(/[^a-z0-9]+/g,'-');
    subjects = subjects || ['Business Administration', 'Computer Science'];
    var profiles = {
      canada: { city:'Toronto / Vancouver, Canada', type:'ApplyBoard partner institution network', accreditation:'Canadian Designated Learning Institution (DLI) pathways', intakes:'January, May, September', tuition:'CAD 17,000 – 24,000 / year (demo range)', requirements:'A/L or equivalent, IELTS 6.0 or accepted alternative' },
      usa: { city:'New York / California / Texas, USA', type:'ApplyBoard partner university and college network', accreditation:'Regionally accredited US institutions', intakes:'January, May, August', tuition:'USD 18,000 – 32,000 / year (demo range)', requirements:'A/L or equivalent, IELTS 6.0 / TOEFL 70+ or accepted alternative' },
      'united-kingdom': { city:'London / Manchester / Birmingham, United Kingdom', type:'ApplyBoard and KC Overseas partner network', accreditation:'UKVI-recognised Student Route sponsor institutions', intakes:'January, May, September', tuition:'GBP 12,000 – 18,000 / year (demo range)', requirements:'A/L or equivalent, IELTS UKVI 6.0 or accepted alternative' },
      australia: { city:'Melbourne / Sydney / Brisbane, Australia', type:'ApplyBoard partner university and college network', accreditation:'CRICOS-registered Australian institutions', intakes:'February, July, November', tuition:'AUD 24,000 – 36,000 / year (demo range)', requirements:'A/L or equivalent, IELTS 6.0 or accepted alternative' },
      cyprus: { city:'Nicosia / Limassol, Cyprus', type:'KC Overseas partner institution network', accreditation:'Cyprus Ministry-recognised higher education institutions', intakes:'February, June, October', tuition:'EUR 4,500 – 8,000 / year (demo range)', requirements:'A/L or equivalent, IELTS 5.5 or accepted alternative' },
      singapore: { city:'Singapore', type:'KC Overseas partner institution network', accreditation:'Singapore EduTrust / recognised private education pathways', intakes:'January, April, July, October', tuition:'SGD 12,000 – 22,000 / year (demo range)', requirements:'A/L or equivalent, IELTS 6.0 or accepted alternative' }
    };
    var key = base.replace('partner-university-network-', '');
    var profile = profiles[key] || { city:'International partner campuses', type:'Partner institution network', accreditation:'Recognised higher education pathways', intakes:'Multiple intakes yearly', tuition:'USD 8,000 – 18,000 / year (demo range)', requirements:'A/L or equivalent, English proficiency evidence' };
    return [{
      slug: base,
      name: name,
      real: false,
      city: profile.city,
      type: profile.type,
      accreditation: profile.accreditation,
      intakes: profile.intakes,
      note: note,
      programs: subjects.map(function(subject, i){
        var level = i === 0 ? 'Diploma / Bachelor' : (i === 1 ? 'Bachelor' : 'Graduate Certificate / Bachelor');
        var duration = i === 0 ? '1 – 3 years' : (i === 1 ? '3 – 4 years' : '1 – 4 years');
        return { slug: base+'-'+(i+1), name: subject+' (demo pathway)', level:level, duration:duration, tuition:profile.tuition, requirements:profile.requirements, intakes:profile.intakes, sample:true };
      })
    }];
  }

  var destinations = [
    {
      slug:'canada', name:'Canada', flag:'🇨🇦', placeholder:true,
      intro:'One of the most popular destinations for Sri Lankan students, offering globally recognised degrees and strong post-study work pathways.',
      visaNotes:'Study permit required; processed via IRCC. Guidance provided through our ApplyBoard partnership.',
      costOfLiving:'Approx. CAD 12,000 – 18,000 / year outside tuition, depending on city and accommodation style.',
      universities: [
        {
          slug:'ontario-public-college-pathway',
          name:'Ontario Public College Pathway',
          real:false,
          city:'Toronto / Greater Toronto Area, Canada',
          type:'Public college pathway via ApplyBoard network',
          accreditation:'Canadian Designated Learning Institution (DLI) pathway',
          intakes:'January, May, September',
          note:'Demo pathway for common Ontario college routes. Final institution selection is handled during counselling.',
          programs:[
            { slug:'ontario-business-diploma', name:'Diploma in Business Administration (demo pathway)', level:'Diploma', duration:'2 years', tuition:'CAD 16,000 – 19,000 / year (demo range)', requirements:'A/L or equivalent, IELTS 6.0 or accepted alternative', intakes:'Jan, May, Sep', sample:true },
            { slug:'ontario-computer-programming', name:'Diploma in Computer Programming (demo pathway)', level:'Diploma', duration:'2 years', tuition:'CAD 17,000 – 21,000 / year (demo range)', requirements:'A/L with maths/IT background preferred, IELTS 6.0 or accepted alternative', intakes:'Jan, May, Sep', sample:true },
            { slug:'ontario-project-management', name:'Graduate Certificate in Project Management (demo pathway)', level:'Graduate Certificate', duration:'1 year', tuition:'CAD 18,000 – 22,000 (demo range)', requirements:'Bachelor degree or diploma, IELTS 6.5 or accepted alternative', intakes:'Jan, May, Sep', sample:true }
          ]
        },
        {
          slug:'british-columbia-university-transfer-pathway',
          name:'British Columbia University Transfer Pathway',
          real:false,
          city:'Vancouver / British Columbia, Canada',
          type:'College-to-university transfer pathway',
          accreditation:'DLI pathway with university-transfer options',
          intakes:'January, May, September',
          note:'Demo pathway for students who want to begin at college and progress into a Canadian university degree.',
          programs:[
            { slug:'bc-associate-business', name:'Associate Degree in Business (demo pathway)', level:'Associate Degree', duration:'2 years', tuition:'CAD 15,000 – 18,500 / year (demo range)', requirements:'A/L or equivalent, IELTS 6.0 or accepted alternative', intakes:'Jan, May, Sep', sample:true },
            { slug:'bc-university-transfer-science', name:'University Transfer in Science (demo pathway)', level:'Transfer Program', duration:'1 – 2 years', tuition:'CAD 15,500 – 19,000 / year (demo range)', requirements:'A/L science stream preferred, IELTS 6.0 or accepted alternative', intakes:'Jan, May, Sep', sample:true }
          ]
        },
        {
          slug:'alberta-technology-pathway',
          name:'Alberta Technology & Trades Pathway',
          real:false,
          city:'Calgary / Edmonton, Canada',
          type:'Applied technology and career-focused college pathway',
          accreditation:'DLI pathway with career-focused diploma options',
          intakes:'January, May, September',
          note:'Demo pathway for practical, employment-aligned programs in technology, engineering support and applied business.',
          programs:[
            { slug:'alberta-engineering-technology', name:'Diploma in Engineering Technology (demo pathway)', level:'Diploma', duration:'2 years', tuition:'CAD 17,000 – 22,000 / year (demo range)', requirements:'A/L maths or technology background preferred, IELTS 6.0 or accepted alternative', intakes:'Jan, Sep', sample:true },
            { slug:'alberta-cybersecurity-certificate', name:'Cybersecurity Graduate Certificate (demo pathway)', level:'Graduate Certificate', duration:'1 year', tuition:'CAD 18,000 – 23,000 (demo range)', requirements:'Diploma or bachelor background in IT preferred, IELTS 6.5 or accepted alternative', intakes:'Jan, May, Sep', sample:true }
          ]
        },
        {
          slug:'atlantic-canada-health-business-pathway',
          name:'Atlantic Canada Health & Business Pathway',
          real:false,
          city:'Nova Scotia / New Brunswick, Canada',
          type:'Regional college pathway with affordable city options',
          accreditation:'DLI pathway in Atlantic Canada',
          intakes:'January, May, September',
          note:'Demo pathway for students looking beyond the largest Canadian cities for more affordable study options.',
          programs:[
            { slug:'atlantic-healthcare-administration', name:'Diploma in Healthcare Administration (demo pathway)', level:'Diploma', duration:'2 years', tuition:'CAD 15,500 – 18,500 / year (demo range)', requirements:'A/L or equivalent, IELTS 6.0 or accepted alternative', intakes:'Jan, Sep', sample:true },
            { slug:'atlantic-supply-chain-management', name:'Supply Chain Management Graduate Certificate (demo pathway)', level:'Graduate Certificate', duration:'1 year', tuition:'CAD 16,500 – 20,000 (demo range)', requirements:'Diploma or bachelor qualification, IELTS 6.5 or accepted alternative', intakes:'Jan, May, Sep', sample:true }
          ]
        }
      ]
    },
    {
      slug:'usa', name:'USA', flag:'🇺🇸', placeholder:true,
      intro:'Home to some of the world’s top-ranked universities, with a huge breadth of programs across every field of study.',
      visaNotes:'F-1 student visa; guidance provided through our ApplyBoard partnership.',
      costOfLiving:'Approx. USD 14,000 – 24,000 / year outside tuition, varying widely by state and campus location.',
      universities: [
        { slug:'usa-community-college-transfer-pathway', name:'Community College to University Transfer Pathway', real:false, city:'California / Washington / New York, USA', type:'Community college transfer pathway via ApplyBoard network', accreditation:'SEVP-certified institutions with transfer pathways', intakes:'January, May, August', note:'Demo route for students who want a lower-cost first step before transferring into a US bachelor degree.',
          programs:[
            { slug:'usa-associate-business-transfer', name:'Associate Degree in Business Transfer (demo pathway)', level:'Associate Degree', duration:'2 years', tuition:'USD 9,000 – 15,000 / year (demo range)', requirements:'A/L or equivalent, IELTS 5.5 – 6.0 or accepted alternative', intakes:'Jan, May, Aug', sample:true },
            { slug:'usa-associate-computer-science-transfer', name:'Associate Degree in Computer Science Transfer (demo pathway)', level:'Associate Degree', duration:'2 years', tuition:'USD 10,000 – 16,000 / year (demo range)', requirements:'A/L with maths preferred, IELTS 5.5 – 6.0 or accepted alternative', intakes:'Jan, May, Aug', sample:true }
          ] },
        { slug:'usa-state-university-pathway', name:'State University Bachelor Pathway', real:false, city:'Texas / Arizona / Midwest USA', type:'Public university pathway via ApplyBoard network', accreditation:'Regionally accredited US public universities', intakes:'January, August', note:'Demo route for students targeting direct bachelor admission at public universities with broader program choice.',
          programs:[
            { slug:'usa-bba-state-university', name:'Bachelor of Business Administration (demo pathway)', level:'Bachelor', duration:'4 years', tuition:'USD 18,000 – 28,000 / year (demo range)', requirements:'A/L or equivalent, IELTS 6.0 or accepted alternative', intakes:'Jan, Aug', sample:true },
            { slug:'usa-bsc-data-science', name:'BSc Data Science (demo pathway)', level:'Bachelor', duration:'4 years', tuition:'USD 20,000 – 32,000 / year (demo range)', requirements:'A/L maths background preferred, IELTS 6.0 or accepted alternative', intakes:'Aug', sample:true }
          ] },
        { slug:'usa-graduate-stem-business-pathway', name:'Graduate STEM & Business Pathway', real:false, city:'Boston / Chicago / Dallas, USA', type:'Graduate pathway via ApplyBoard network', accreditation:'Regionally accredited US graduate institutions', intakes:'January, May, August', note:'Demo route for graduates seeking master-level study in technology, analytics or management.',
          programs:[
            { slug:'usa-ms-business-analytics', name:'MS Business Analytics (demo pathway)', level:'Master', duration:'1.5 – 2 years', tuition:'USD 24,000 – 42,000 total (demo range)', requirements:'Bachelor degree, IELTS 6.5 / TOEFL accepted alternative', intakes:'Jan, Aug', sample:true },
            { slug:'usa-ms-computer-science', name:'MS Computer Science (demo pathway)', level:'Master', duration:'2 years', tuition:'USD 28,000 – 48,000 total (demo range)', requirements:'Relevant bachelor degree, IELTS 6.5 / TOEFL accepted alternative', intakes:'Jan, Aug', sample:true }
          ] }
      ]
    },
    {
      slug:'uk', name:'United Kingdom', flag:'🇬🇧', placeholder:true,
      intro:'Shorter, intensive degree structures and a long-standing academic reputation make the UK a consistent top choice.',
      visaNotes:'Student (Route) visa; guidance provided through our ApplyBoard and KC Overseas partnerships.',
      costOfLiving:'Approx. GBP 10,000 – 15,000 / year outside tuition, with London usually higher than regional cities.',
      universities: [
        { slug:'uk-london-business-pathway', name:'London Business & Management Pathway', real:false, city:'London, United Kingdom', type:'University and pathway-provider route via ApplyBoard / KC Overseas', accreditation:'UKVI Student Route sponsor pathway', intakes:'January, May, September', note:'Demo route for students targeting business, management and finance study in London.',
          programs:[
            { slug:'uk-ba-business-management', name:'BA (Hons) Business Management (demo pathway)', level:'Bachelor', duration:'3 years', tuition:'GBP 13,000 – 17,000 / year (demo range)', requirements:'A/L or foundation qualification, IELTS UKVI 6.0 or accepted alternative', intakes:'Jan, Sep', sample:true },
            { slug:'uk-msc-international-business', name:'MSc International Business (demo pathway)', level:'Master', duration:'1 year', tuition:'GBP 15,000 – 22,000 total (demo range)', requirements:'Bachelor degree, IELTS 6.5 or accepted alternative', intakes:'Jan, Sep', sample:true }
          ] },
        { slug:'uk-regional-computing-pathway', name:'Regional Computing & Cybersecurity Pathway', real:false, city:'Manchester / Birmingham / Leeds, United Kingdom', type:'Regional university pathway via partner networks', accreditation:'UKVI Student Route sponsor pathway', intakes:'January, September', note:'Demo route for students who prefer strong regional universities and lower living costs than central London.',
          programs:[
            { slug:'uk-bsc-computer-science', name:'BSc (Hons) Computer Science (demo pathway)', level:'Bachelor', duration:'3 years', tuition:'GBP 14,000 – 18,000 / year (demo range)', requirements:'A/L with maths/IT preferred, IELTS 6.0 or accepted alternative', intakes:'Sep', sample:true },
            { slug:'uk-msc-cybersecurity', name:'MSc Cybersecurity (demo pathway)', level:'Master', duration:'1 year', tuition:'GBP 15,500 – 21,000 total (demo range)', requirements:'Relevant bachelor degree, IELTS 6.5 or accepted alternative', intakes:'Jan, Sep', sample:true }
          ] },
        { slug:'uk-health-science-pathway', name:'Health Science & Public Health Pathway', real:false, city:'England / Scotland, United Kingdom', type:'Health and life-science university pathway', accreditation:'UKVI Student Route sponsor pathway', intakes:'January, September', note:'Demo route for students interested in health sciences, public health and related postgraduate study.',
          programs:[
            { slug:'uk-bsc-health-sciences', name:'BSc Health Sciences (demo pathway)', level:'Bachelor', duration:'3 years', tuition:'GBP 14,000 – 19,000 / year (demo range)', requirements:'A/L science stream preferred, IELTS 6.0 or accepted alternative', intakes:'Sep', sample:true },
            { slug:'uk-msc-public-health', name:'MSc Public Health (demo pathway)', level:'Master', duration:'1 year', tuition:'GBP 15,000 – 22,000 total (demo range)', requirements:'Bachelor degree in relevant field, IELTS 6.5 or accepted alternative', intakes:'Jan, Sep', sample:true }
          ] }
      ]
    },
    {
      slug:'europe', name:'Europe', flag:'🇪🇺', placeholder:false,
      intro:'Our fullest-built destination, home to our direct partner universities in Malta and Lithuania, plus KC Overseas network access across Switzerland, Ireland, France, Italy, Germany, Spain and more.',
      visaNotes:'National (long-stay) visas vary by country; our team advises based on the destination country within Europe.',
      costOfLiving:'Approx. EUR 7,000 – 12,000 / year outside tuition for many Central/Southern Europe options; country and city vary.',
      universities: malta(),
      networkNote:'Also reachable via KC Overseas across Switzerland, Ireland, France, Italy, Germany, Spain, Sweden, Netherlands, Finland, Austria, Denmark, Hungary, Belgium, Russia and Poland, with institution selection handled during counselling.'
    },
    {
      slug:'australia', name:'Australia', flag:'🇦🇺', placeholder:true,
      intro:'A top destination for research-strength universities and generous post-study work rights.',
      visaNotes:'Student visa (Subclass 500); guidance provided through our ApplyBoard partnership.',
      costOfLiving:'Approx. AUD 21,000 – 29,000 / year outside tuition, depending on city, housing and lifestyle.',
      universities: [
        { slug:'australia-university-foundation-pathway', name:'University Foundation & Bachelor Pathway', real:false, city:'Melbourne / Sydney / Brisbane, Australia', type:'CRICOS-registered university pathway via ApplyBoard network', accreditation:'CRICOS-registered Australian study pathway', intakes:'February, July, November', note:'Demo route for students who need a foundation or diploma stage before entering a bachelor degree.',
          programs:[
            { slug:'aus-foundation-business-it', name:'Foundation in Business & IT (demo pathway)', level:'Foundation', duration:'8 – 12 months', tuition:'AUD 18,000 – 26,000 (demo range)', requirements:'O/L or A/L profile depending on pathway, IELTS 5.5 or accepted alternative', intakes:'Feb, Jul, Nov', sample:true },
            { slug:'aus-bachelor-business', name:'Bachelor of Business (demo pathway)', level:'Bachelor', duration:'3 years', tuition:'AUD 26,000 – 36,000 / year (demo range)', requirements:'A/L or completed foundation, IELTS 6.0 or accepted alternative', intakes:'Feb, Jul', sample:true }
          ] },
        { slug:'australia-it-data-pathway', name:'Information Technology & Data Pathway', real:false, city:'Melbourne / Adelaide / Perth, Australia', type:'Technology-focused university pathway', accreditation:'CRICOS-registered Australian institutions', intakes:'February, July', note:'Demo route for students targeting IT, software and data-related programs.',
          programs:[
            { slug:'aus-bachelor-information-technology', name:'Bachelor of Information Technology (demo pathway)', level:'Bachelor', duration:'3 years', tuition:'AUD 28,000 – 38,000 / year (demo range)', requirements:'A/L with maths/IT preferred, IELTS 6.0 or accepted alternative', intakes:'Feb, Jul', sample:true },
            { slug:'aus-master-data-analytics', name:'Master of Data Analytics (demo pathway)', level:'Master', duration:'2 years', tuition:'AUD 32,000 – 42,000 / year (demo range)', requirements:'Bachelor degree, IELTS 6.5 or accepted alternative', intakes:'Feb, Jul', sample:true }
          ] },
        { slug:'australia-health-community-pathway', name:'Health, Community & Aged Care Pathway', real:false, city:'Queensland / South Australia, Australia', type:'Career-focused health and community services pathway', accreditation:'CRICOS-registered vocational and higher education pathways', intakes:'February, July, October', note:'Demo route for students interested in health administration, community services and care-related fields.',
          programs:[
            { slug:'aus-diploma-community-services', name:'Diploma of Community Services (demo pathway)', level:'Diploma', duration:'1.5 – 2 years', tuition:'AUD 14,000 – 20,000 / year (demo range)', requirements:'A/L or equivalent, IELTS 5.5 – 6.0 or accepted alternative', intakes:'Feb, Jul, Oct', sample:true },
            { slug:'aus-healthcare-management', name:'Graduate Diploma in Healthcare Management (demo pathway)', level:'Graduate Diploma', duration:'1 year', tuition:'AUD 22,000 – 30,000 (demo range)', requirements:'Bachelor degree or relevant diploma plus experience, IELTS 6.5 or accepted alternative', intakes:'Feb, Jul', sample:true }
          ] }
      ]
    },
    {
      slug:'new-zealand', name:'New Zealand', flag:'🇳🇿', placeholder:false,
      intro:'A safe, welcoming destination with direct university partnerships and a straightforward pathway from foundation to degree study.',
      visaNotes:'Student visa via Immigration New Zealand; supported directly through our NZSE and ICA partnerships.',
      costOfLiving:'Approx. NZD 15,000 – 22,000 / year outside tuition, with Auckland usually higher than smaller cities.',
      universities: [
        { slug:'nzse', name:'NZ Skills & Education College (NZSE)', real:true, city:'Auckland, New Zealand', type:'Private Training Establishment', accreditation:'NZQA accredited', intakes:'Multiple intakes yearly',
          programs:[
            { slug:'nzse-business-diploma', name:'Diploma in Business (demo pathway)', level:'Diploma', duration:'1 year', tuition:'NZD 18,000 – 22,000 / year (demo range)', requirements:'A/L or equivalent, IELTS 5.5 or accepted alternative', intakes:'February, July, October', sample:true },
            { slug:'nzse-it-diploma', name:'Diploma in Information Technology (demo pathway)', level:'Diploma', duration:'1 year', tuition:'NZD 19,000 – 23,000 / year (demo range)', requirements:'A/L with maths/IT background preferred, IELTS 5.5 or accepted alternative', intakes:'February, July, October', sample:true }
          ] },
        { slug:'international-college-of-auckland', name:'International College of Auckland', real:true, city:'Auckland, New Zealand', type:'Private Tertiary College', accreditation:'NZQA accredited', intakes:'Multiple intakes yearly',
          programs:[
            { slug:'ica-foundation-business', name:'Foundation in Business (demo pathway)', level:'Foundation', duration:'8 months', tuition:'NZD 12,000 – 15,000 (demo range)', requirements:'O/L or equivalent, IELTS 5.0 or accepted alternative', intakes:'March, July, November', sample:true },
            { slug:'ica-diploma-hospitality', name:'Diploma in Hospitality Management (demo pathway)', level:'Diploma', duration:'1 year', tuition:'NZD 16,000 – 20,000 / year (demo range)', requirements:'A/L or equivalent, IELTS 5.5 or accepted alternative', intakes:'March, July, November', sample:true }
          ] }
      ]
    },
    {
      slug:'cyprus', name:'Cyprus', flag:'🇨🇾', placeholder:true,
      intro:'An affordable EU-adjacent destination, growing quickly as a study option through our KC Overseas network.',
      visaNotes:'Student visa guidance provided through our KC Overseas partnership.',
      costOfLiving:'Approx. EUR 6,000 – 10,000 / year outside tuition, depending on city and accommodation.',
      universities: [
        { slug:'cyprus-business-hospitality-pathway', name:'Business & Hospitality Pathway', real:false, city:'Nicosia / Limassol, Cyprus', type:'KC Overseas partner institution pathway', accreditation:'Cyprus Ministry-recognised higher education pathway', intakes:'February, June, October', note:'Demo route for students looking for affordable business and hospitality study options in Cyprus.',
          programs:[
            { slug:'cyprus-business-administration', name:'BA Business Administration (demo pathway)', level:'Bachelor', duration:'4 years', tuition:'EUR 4,500 – 7,000 / year (demo range)', requirements:'A/L or equivalent, IELTS 5.5 or accepted alternative', intakes:'Feb, Jun, Oct', sample:true },
            { slug:'cyprus-hospitality-management', name:'BA Hospitality Management (demo pathway)', level:'Bachelor', duration:'4 years', tuition:'EUR 4,800 – 7,500 / year (demo range)', requirements:'A/L or equivalent, IELTS 5.5 or accepted alternative', intakes:'Feb, Jun, Oct', sample:true }
          ] },
        { slug:'cyprus-computing-health-pathway', name:'Computing & Health Science Pathway', real:false, city:'Nicosia / Larnaca, Cyprus', type:'KC Overseas partner institution pathway', accreditation:'Cyprus Ministry-recognised higher education pathway', intakes:'February, October', note:'Demo route for students considering technology, health science or applied science options in Cyprus.',
          programs:[
            { slug:'cyprus-computer-science', name:'BSc Computer Science (demo pathway)', level:'Bachelor', duration:'4 years', tuition:'EUR 5,000 – 8,000 / year (demo range)', requirements:'A/L with maths/IT preferred, IELTS 5.5 or accepted alternative', intakes:'Feb, Oct', sample:true },
            { slug:'cyprus-public-health', name:'BSc Public Health (demo pathway)', level:'Bachelor', duration:'4 years', tuition:'EUR 5,000 – 8,500 / year (demo range)', requirements:'A/L science stream preferred, IELTS 5.5 or accepted alternative', intakes:'Oct', sample:true }
          ] }
      ]
    },
    {
      slug:'singapore', name:'Singapore', flag:'🇸🇬', placeholder:true,
      intro:'A global education and business hub, well connected to Sri Lanka with strong industry ties.',
      visaNotes:'Student’s Pass; guidance provided through our KC Overseas partnership.',
      costOfLiving:'Approx. SGD 12,000 – 20,000 / year outside tuition, depending on housing and lifestyle.',
      universities: [
        { slug:'singapore-business-analytics-pathway', name:'Business Analytics & Management Pathway', real:false, city:'Singapore', type:'Private education institution pathway via KC Overseas network', accreditation:'Singapore EduTrust / recognised private education pathway', intakes:'January, April, July, October', note:'Demo route for students looking for industry-connected business and analytics programs in Singapore.',
          programs:[
            { slug:'singapore-business-analytics-diploma', name:'Diploma in Business Analytics (demo pathway)', level:'Diploma', duration:'8 – 12 months', tuition:'SGD 10,000 – 15,000 (demo range)', requirements:'O/L or A/L profile depending on level, IELTS 5.5 or accepted alternative', intakes:'Jan, Apr, Jul, Oct', sample:true },
            { slug:'singapore-bachelor-business-management', name:'Bachelor in Business Management (demo pathway)', level:'Bachelor', duration:'2 – 3 years', tuition:'SGD 18,000 – 28,000 / year (demo range)', requirements:'A/L or completed diploma pathway, IELTS 6.0 or accepted alternative', intakes:'Jan, Jul, Oct', sample:true }
          ] },
        { slug:'singapore-it-cybersecurity-pathway', name:'IT, Cybersecurity & Digital Systems Pathway', real:false, city:'Singapore', type:'Technology-focused private education pathway', accreditation:'Singapore EduTrust / recognised private education pathway', intakes:'January, April, July, October', note:'Demo route for students targeting Singapore technology and digital business programs.',
          programs:[
            { slug:'singapore-information-technology-diploma', name:'Diploma in Information Technology (demo pathway)', level:'Diploma', duration:'8 – 12 months', tuition:'SGD 11,000 – 16,000 (demo range)', requirements:'O/L or A/L profile depending on level, IELTS 5.5 or accepted alternative', intakes:'Jan, Apr, Jul, Oct', sample:true },
            { slug:'singapore-cybersecurity-degree', name:'Bachelor in Cybersecurity (demo pathway)', level:'Bachelor', duration:'2 – 3 years', tuition:'SGD 20,000 – 32,000 / year (demo range)', requirements:'A/L or diploma in IT pathway, IELTS 6.0 or accepted alternative', intakes:'Jan, Jul', sample:true }
          ] }
      ]
    },
    {
      slug:'malaysia', name:'Malaysia', flag:'🇲🇾', placeholder:false,
      intro:'A cost-effective destination with a direct university partnership and strong regional recognition.',
      visaNotes:'Student Pass via EMGS; supported directly through our INTI partnership.',
      costOfLiving:'Approx. MYR 18,000 – 30,000 / year outside tuition, making Malaysia one of the more affordable regional options.',
      universities: [
        { slug:'inti-international-university', name:'INTI International University & Colleges', real:true, city:'Nilai / Subang Jaya, Malaysia', type:'Private University', accreditation:'Malaysian Qualifications Agency (MQA) accredited', intakes:'Multiple intakes yearly',
          programs:[
            { slug:'inti-bsc-computer-science', name:'BSc Computer Science (demo pathway)', level:'Bachelor', duration:'3 years', tuition:'MYR 38,000 – 52,000 total (demo range)', requirements:'A/L with maths/IT background preferred, IELTS 5.5 or accepted alternative', intakes:'January, May, August', sample:true },
            { slug:'inti-bachelor-business', name:'Bachelor of Business Administration (demo pathway)', level:'Bachelor', duration:'3 years', tuition:'MYR 35,000 – 48,000 total (demo range)', requirements:'A/L or equivalent, IELTS 5.5 or accepted alternative', intakes:'January, May, August', sample:true }
          ] }
      ]
    }
  ];

  function findDestination(slug){ return destinations.find(function(d){ return d.slug === slug; }); }
  function findUniversity(slug){
    for(var i=0;i<destinations.length;i++){
      var u = destinations[i].universities.find(function(u){ return u.slug === slug; });
      if(u) return { university:u, destination:destinations[i] };
    }
    return null;
  }
  function findProgram(slug){
    for(var i=0;i<destinations.length;i++){
      for(var j=0;j<destinations[i].universities.length;j++){
        var uni = destinations[i].universities[j];
        var p = uni.programs.find(function(p){ return p.slug === slug; });
        if(p) return { program:p, university:uni, destination:destinations[i] };
      }
    }
    return null;
  }

  window.RG_DATA = {
    destinations: destinations,
    findDestination: findDestination,
    findUniversity: findUniversity,
    findProgram: findProgram
  };
})();
