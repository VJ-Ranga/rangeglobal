/* ===========================================================
   Range Global Education — V3 content data
   Destination -> University -> Program drill-down.

   Mirrors the WordPress CPT structure (Destination / University / Program),
   so editing this file later = editing the CPTs.

   CONFIRMED vs SAMPLE
   -------------------
   Destination names and institution names come from the approved content
   document "RGE Website contents (1).docx" and are real.

   Everything at programme level — course names, durations, tuition,
   entry requirements, intakes — plus per-country visa/cost notes are
   SAMPLE data, marked `sample:true`, and are rendered with a visible
   badge. They exist so the client can see the finished experience.
   Replace them with university-confirmed detail before launch.
   =========================================================== */
(function () {

  // helper: mark every programme in a list as sample data
  function s(list) { return list.map(function (p) { p.sample = true; return p; }); }

  var destinations = [
    {
      slug: 'malta', name: 'Malta', tag: 'Direct collaborations', confirmed: true,
      flag: '🇲🇹', intro: 'Seven institutions under direct collaborations, with English-taught programmes inside the EU.',
      blurb: 'Our largest group of direct university collaborations. English-taught programmes inside the EU, with seven named institutions across the island.',
      notes: {
        visa: 'National (long-stay) student visa. Requirements and processing times vary — our counsellors advise per institution.',
        cost: 'Approx. EUR 7,000 – 10,000 per year outside tuition; varies by city and accommodation type.',
        intakes: 'Most partners run February and September intakes.'
      },
      universities: [
        { slug: 'global-college-malta', name: 'Global College Malta', city: 'St Julian’s, Malta', type: 'Higher Education College', website: 'https://gcm.edu.mt/',
          accreditation: 'MFHEA accredited', intakes: 'January, September',
          programs: s([
            { slug: 'gcm-foundation-business-it', name: 'Foundation in Business & IT', level: 'Foundation', duration: '8 months', tuition: 'EUR 3,800 – 4,200', requirements: 'O/L pass, IELTS 5.0', intakes: 'Jan, Sep' },
            { slug: 'gcm-bsc-business', name: 'BSc (Hons) Business Management', level: 'Bachelor', duration: '3 years', tuition: 'EUR 6,800 – 7,600 / year', requirements: 'A/L pass or equivalent, IELTS 6.0', intakes: 'Sep' },
            { slug: 'gcm-bsc-computing', name: 'BSc Computing', level: 'Bachelor', duration: '3 years', tuition: 'EUR 6,800 – 7,600 / year', requirements: 'A/L pass with Maths, IELTS 6.0', intakes: 'Sep' }
          ]) },
        { slug: 'ascencia-malta', name: 'Ascencia Malta', city: 'Naxxar, Malta', type: 'Private Business School', website: 'https://www.ascenciamalta.edu.mt/',
          accreditation: 'MFHEA accredited', intakes: 'February, September',
          programs: s([
            { slug: 'asc-bsc-business-management', name: 'BSc (Hons) Business Management', level: 'Bachelor', duration: '3 years', tuition: 'EUR 6,500 – 7,500 / year', requirements: 'A/L pass or equivalent, IELTS 6.0', intakes: 'Feb, Sep' },
            { slug: 'asc-mba-international-business', name: 'MBA International Business', level: 'Master', duration: '18 months', tuition: 'EUR 8,000 – 9,000 total', requirements: 'Bachelor’s degree, IELTS 6.5', intakes: 'Sep' },
            { slug: 'asc-diploma-hospitality', name: 'Diploma in Hospitality Management', level: 'Diploma', duration: '1 year', tuition: 'EUR 4,500 – 5,200', requirements: 'A/L pass or equivalent, IELTS 5.5', intakes: 'Feb, Sep' }
          ]) },
        { slug: 'gbsb-global', name: 'GBSB Global Business School', city: 'Valletta, Malta', type: 'Private Business School', website: 'https://www.global-business-school.org/gbsb-global-business-school-malta/',
          accreditation: 'MFHEA accredited', intakes: 'January, April, October',
          programs: s([
            { slug: 'gbsb-bba-digital', name: 'BBA in Digital Business', level: 'Bachelor', duration: '3 years', tuition: 'EUR 8,500 – 9,500 / year', requirements: 'A/L pass or equivalent, IELTS 6.0', intakes: 'Jan, Oct' },
            { slug: 'gbsb-msc-digital-marketing', name: 'MSc Digital Marketing', level: 'Master', duration: '1 year', tuition: 'EUR 9,000 – 10,500 total', requirements: 'Bachelor’s degree, IELTS 6.5', intakes: 'Jan, Apr, Oct' }
          ]) },
        { slug: 'learnkey-institute', name: 'Learnkey Institute', city: 'Sliema, Malta', type: 'Private Institute', website: 'https://www.learnkey.com.mt/',
          accreditation: 'MFHEA accredited', intakes: 'February, September',
          programs: s([
            { slug: 'lk-diploma-digital-marketing', name: 'Diploma in Digital Marketing', level: 'Diploma', duration: '1 year', tuition: 'EUR 4,200 – 4,800', requirements: 'A/L pass, IELTS 5.5', intakes: 'Feb, Sep' },
            { slug: 'lk-adv-diploma-it', name: 'Advanced Diploma in Information Technology', level: 'Diploma', duration: '18 months', tuition: 'EUR 5,400 – 6,000', requirements: 'A/L pass (Maths preferred), IELTS 5.5', intakes: 'Sep' }
          ]) },
        { slug: 'la-vallette-institute', name: 'La Vallette Institute', city: 'Valletta, Malta', type: 'Private Institute', website: 'https://www.lavaletteinstitute.com/',
          accreditation: 'MFHEA accredited', intakes: 'February, September',
          programs: s([
            { slug: 'lv-diploma-business-admin', name: 'Diploma in Business Administration', level: 'Diploma', duration: '1 year', tuition: 'EUR 4,000 – 4,600', requirements: 'A/L pass, IELTS 5.5', intakes: 'Feb, Sep' },
            { slug: 'lv-cert-english', name: 'Certificate in English for Academic Purposes', level: 'Certificate', duration: '6 months', tuition: 'EUR 2,400 – 2,900', requirements: 'O/L pass', intakes: 'Rolling' }
          ]) },
        { slug: 'idea-college', name: 'Idea College', city: 'Msida, Malta', type: 'Higher Education College', website: 'https://ideaeducation.com/',
          accreditation: 'MFHEA accredited', intakes: 'February, October',
          programs: s([
            { slug: 'idea-diploma-computing', name: 'Diploma in Computing', level: 'Diploma', duration: '1 year', tuition: 'EUR 4,300 – 4,900', requirements: 'A/L pass, IELTS 5.5', intakes: 'Feb, Oct' },
            { slug: 'idea-bsc-software', name: 'BSc Software Development', level: 'Bachelor', duration: '3 years', tuition: 'EUR 7,000 – 7,800 / year', requirements: 'A/L pass with Maths, IELTS 6.0', intakes: 'Oct' }
          ]) },
        { slug: 'training-three-sixty', name: 'Training Three Sixty', city: 'Birkirkara, Malta', type: 'Vocational Training Institute', website: 'https://training360.com.mt/',
          accreditation: 'MFHEA accredited', intakes: 'Rolling',
          programs: s([
            { slug: 't360-cert-hospitality', name: 'Certificate in Hospitality Operations', level: 'Certificate', duration: '6 months', tuition: 'EUR 2,600 – 3,100', requirements: 'O/L pass, IELTS 5.0', intakes: 'Rolling' },
            { slug: 't360-diploma-care', name: 'Diploma in Health & Social Care', level: 'Diploma', duration: '1 year', tuition: 'EUR 4,100 – 4,700', requirements: 'A/L pass, IELTS 5.5', intakes: 'Feb, Sep' }
          ]) }
      ]
    },

    {
      slug: 'new-zealand', name: 'New Zealand', tag: 'Direct collaborations', confirmed: true,
      flag: '🇳🇿', intro: 'Two Auckland institutions under direct collaborations, with strong post-study work pathways.',
      blurb: 'Two Auckland institutions under direct collaborations, plus wider access through our authorised recruitment partnerships for New Zealand.',
      notes: {
        visa: 'Fee-paying student visa. Evidence of funds and an offer of place are required.',
        cost: 'Approx. NZD 20,000 – 25,000 per year outside tuition; Auckland sits at the higher end.',
        intakes: 'February and July are the main intakes.'
      },
      universities: [
        { slug: 'nzse', name: 'NZSE', city: 'Auckland, New Zealand', type: 'Private Training Establishment', website: 'https://nzse.ac.nz/',
          accreditation: 'NZQA registered', intakes: 'February, July',
          programs: s([
            { slug: 'nzse-diploma-business', name: 'New Zealand Diploma in Business', level: 'Diploma', duration: '2 years', tuition: 'NZD 17,000 – 19,500 / year', requirements: 'A/L pass, IELTS 6.0', intakes: 'Feb, Jul' },
            { slug: 'nzse-cert-construction', name: 'Certificate in Construction Trade Skills', level: 'Certificate', duration: '1 year', tuition: 'NZD 15,000 – 17,000', requirements: 'O/L pass, IELTS 5.5', intakes: 'Feb, Jul' }
          ]) },
        { slug: 'international-college-auckland', name: 'International College of Auckland', city: 'Auckland, New Zealand', type: 'Private Tertiary Institution', website: 'https://ica.ac.nz/',
          accreditation: 'NZQA registered', intakes: 'February, July, October',
          programs: s([
            { slug: 'ica-diploma-it', name: 'Diploma in Information Technology', level: 'Diploma', duration: '2 years', tuition: 'NZD 18,000 – 20,000 / year', requirements: 'A/L pass, IELTS 6.0', intakes: 'Feb, Jul' },
            { slug: 'ica-diploma-hospitality', name: 'Diploma in Hospitality Management', level: 'Diploma', duration: '18 months', tuition: 'NZD 16,500 – 18,500 / year', requirements: 'A/L pass, IELTS 5.5', intakes: 'Feb, Jul, Oct' }
          ]) }
      ]
    },

    {
      slug: 'georgia', name: 'Georgia', tag: 'Direct collaboration', confirmed: true,
      flag: '🇬🇪', intro: 'English-taught medical and business degrees at lower tuition than most of Europe.',
      blurb: 'A direct collaboration with Alte University in Tbilisi, offering English-taught degrees at lower tuition than most European destinations.',
      notes: {
        visa: 'Student residence permit applied for after arrival, based on the university offer.',
        cost: 'Approx. USD 3,500 – 5,000 per year outside tuition.',
        intakes: 'September, with a smaller February intake.'
      },
      universities: [
        { slug: 'alte-university', name: 'Alte University', city: 'Tbilisi, Georgia', type: 'Private University', website: 'https://alte.edu.ge/en/',
          accreditation: 'Authorised by the National Center for Educational Quality Enhancement', intakes: 'February, September',
          programs: s([
            { slug: 'alte-md', name: 'Doctor of Medicine (MD)', level: 'Bachelor', duration: '6 years', tuition: 'USD 6,000 – 8,000 / year', requirements: 'A/L Biology & Chemistry, IELTS 6.0', intakes: 'Sep' },
            { slug: 'alte-dentistry', name: 'Doctor of Dental Medicine', level: 'Bachelor', duration: '5 years', tuition: 'USD 7,000 – 9,000 / year', requirements: 'A/L Biology & Chemistry, IELTS 6.0', intakes: 'Sep' },
            { slug: 'alte-ba-business', name: 'BA Business Administration', level: 'Bachelor', duration: '4 years', tuition: 'USD 3,500 – 4,500 / year', requirements: 'A/L pass, IELTS 5.5', intakes: 'Feb, Sep' }
          ]) }
      ]
    },

    {
      slug: 'malaysia', name: 'Malaysia', tag: 'Direct collaboration', confirmed: true,
      flag: '🇲🇾', intro: 'An established private university with UK and Australian degree pathways.',
      blurb: 'A direct collaboration with INTI International University, one of Malaysia’s established private universities with UK and Australian degree pathways.',
      notes: {
        visa: 'Student Pass arranged through the university via EMGS before travel.',
        cost: 'Approx. MYR 18,000 – 24,000 per year outside tuition.',
        intakes: 'January, May and September.'
      },
      universities: [
        { slug: 'inti-international-university', name: 'INTI International University', city: 'Nilai, Malaysia', type: 'Private University', website: 'https://newinti.edu.my/',
          accreditation: 'MQA accredited', intakes: 'January, May, September',
          programs: s([
            { slug: 'inti-bba', name: 'Bachelor of Business Administration', level: 'Bachelor', duration: '3 years', tuition: 'MYR 32,000 – 38,000 / year', requirements: 'A/L pass, IELTS 5.5', intakes: 'Jan, May, Sep' },
            { slug: 'inti-beng-mechanical', name: 'BEng (Hons) Mechanical Engineering', level: 'Bachelor', duration: '4 years', tuition: 'MYR 38,000 – 44,000 / year', requirements: 'A/L Maths & Physics, IELTS 6.0', intakes: 'Jan, Sep' },
            { slug: 'inti-bsc-computing', name: 'BSc (Hons) Computer Science', level: 'Bachelor', duration: '3 years', tuition: 'MYR 35,000 – 41,000 / year', requirements: 'A/L Maths, IELTS 6.0', intakes: 'Jan, May, Sep' }
          ]) }
      ]
    },

    // Destinations reached through authorised recruitment partnerships.
    // No named direct collaboration institutions in the source document.
    {
      slug: 'ireland', name: 'Ireland', tag: 'Recruitment partnerships', confirmed: true, network: true,
      flag: '🇮🇪', intro: 'English-speaking EU destination reached through our authorised recruitment network.',
      blurb: 'Reached through our authorised global recruitment partnerships, giving access to a broader network of recognised Irish institutions.',
      notes: {
        visa: 'Irish study visa, applied for after receiving an offer and paying tuition.',
        cost: 'Approx. EUR 10,000 – 14,000 per year outside tuition.',
        intakes: 'September, with limited January entry.'
      },
      universities: []
    },
    {
      slug: 'netherlands', name: 'Netherlands', tag: 'Recruitment partnerships', confirmed: true, network: true,
      flag: '🇳🇱', intro: 'A wide range of English-taught programmes across recognised Dutch institutions.',
      blurb: 'Reached through our authorised global recruitment partnerships, with a wide range of English-taught programmes.',
      notes: {
        visa: 'MVV entry visa and residence permit, arranged by the institution as your sponsor.',
        cost: 'Approx. EUR 10,000 – 13,000 per year outside tuition.',
        intakes: 'September, with some February starts.'
      },
      universities: []
    },
    {
      slug: 'united-states', name: 'United States', tag: 'Recruitment partnerships', confirmed: true, network: true,
      flag: '🇺🇸', intro: 'A broad range of colleges and universities through our recruitment partnerships.',
      blurb: 'Reached through our authorised global recruitment partnerships, covering a broad range of colleges and universities.',
      notes: {
        visa: 'F-1 student visa, following the I-20 issued by your institution.',
        cost: 'Approx. USD 12,000 – 20,000 per year outside tuition; varies widely by state.',
        intakes: 'Fall (August/September) and Spring (January).'
      },
      universities: []
    },
    {
      slug: 'canada', name: 'Canada', tag: 'Approved destination', confirmed: true, network: true,
      flag: '🇨🇦', intro: 'One of the most popular destinations, with globally recognised degrees and post-study work pathways.',
      blurb: 'An approved study destination within our network, with programmes across colleges and universities.',
      notes: {
        visa: 'Study permit, applied for with a Provincial Attestation Letter and letter of acceptance.',
        cost: 'Approx. CAD 15,000 – 20,000 per year outside tuition.',
        intakes: 'September, January and May.'
      },
      universities: []
    }
  ];

  // Global recruitment partnership markets, as listed in the source document.
  var recruitmentMarkets = [
    'United States of America', 'United Kingdom', 'New Zealand', 'Netherland', 'Ireland'
  ];

  function findDestination(slug) {
    return destinations.filter(function (d) { return d.slug === slug; })[0] || null;
  }
  function findUniversity(slug) {
    for (var i = 0; i < destinations.length; i++) {
      var list = destinations[i].universities;
      for (var j = 0; j < list.length; j++) {
        if (list[j].slug === slug) return { university: list[j], destination: destinations[i] };
      }
    }
    return null;
  }
  function findProgram(slug) {
    for (var i = 0; i < destinations.length; i++) {
      var list = destinations[i].universities;
      for (var j = 0; j < list.length; j++) {
        var progs = list[j].programs || [];
        for (var k = 0; k < progs.length; k++) {
          if (progs[k].slug === slug) {
            return { program: progs[k], university: list[j], destination: destinations[i] };
          }
        }
      }
    }
    return null;
  }
  function allUniversities() {
    return destinations.reduce(function (acc, d) {
      d.universities.forEach(function (u) { acc.push({ university: u, destination: d }); });
      return acc;
    }, []);
  }

  window.RG_DATA = {
    destinations: destinations,
    recruitmentMarkets: recruitmentMarkets,
    findDestination: findDestination,
    findUniversity: findUniversity,
    findProgram: findProgram,
    allUniversities: allUniversities
  };
})();
