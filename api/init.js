// ✅ Tabs ke liye fix - HTML wala switchTab use karein
if (typeof window.switchTab !== 'function') {
  console.warn('⚠️ switchTab not found, defining fallback...');
  window.switchTab = function(tabId, btn) {
    console.log('🔄 Switching to tab:', tabId);
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab-content').forEach(function(el) {
      el.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(function(el) {
      el.classList.remove('active');
    });
    
    // Add active class to target
    var target = document.getElementById(tabId);
    if (target) {
      target.classList.add('active');
      console.log('✅ Tab activated:', tabId);
    } else {
      console.error('❌ Tab not found:', tabId);
    }
    
    if (btn) {
      btn.classList.add('active');
    }
    
    // ✅ Load tab content from API files
    var loaders = {
      'converter': 'loadConverter',
      'smart-search': 'loadSmartSearch',
      'trending': 'loadTrending',
      'cyber': 'loadCyber',
      'zameen': 'loadZameen',
      'family': 'loadFamily',
      'all-courts': 'loadAllCourts',
      'rto-rti': 'loadRtoRti',
      'junior': 'loadJunior',
      'ai-doc': 'loadAIDoc',
      'blog-rss': 'loadBlogRSS',
      'cases': 'loadCases',
      'live': 'loadLiveNews',
      'dashboard': 'loadDashboard',
      'sources': 'loadSources',
      'quiz': 'loadQuiz',
      'resources': 'loadResources',
      'exam-prep': 'loadExamPrep',
      'community': 'loadCommunity',
      'dictionary': 'loadDictionary',
      'landmark': 'loadLandmark',
      'funny': 'loadFunny',
      'mock': 'loadMock',
      'post-fir': 'loadPostFIR',
      'case-track': 'loadCaseTrack',
      'bail-guide': 'loadBailGuide',
      'section-finder': 'loadSectionFinder',
      'notice-generator': 'loadNoticeGenerator',
      'suggestions': 'loadSuggestions',
      'calculator': 'loadCalculatorGrid',
      'timeline': 'loadTimeline',
      'summarizer': 'loadSummarizer',
      'safety': 'loadSafety',
      'dailyquiz': 'loadDailyQuiz',
      'helpline': 'loadHelpline',
      'cause-list': 'loadCauseList',
      'legal-aid': 'loadLegalAid',
      'bare-act': 'loadBareAct',
      'videos': 'loadVideos',
      'donate': 'loadDonate'
    };
    
    var fn = loaders[tabId];
    if (fn && typeof window[fn] === 'function') {
      console.log('📦 Loading:', fn);
      window[fn]();
    } else {
      console.log('⚠️ No loader for:', tabId);
    }
  };
}
