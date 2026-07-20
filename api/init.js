// ===== src/api/init.js - Complete Health Check & Initialization =====

// Health status object
const HEALTH_STATUS = {
  initialized: false,
  modules: {},
  errors: [],
  timestamp: null
};

// Module registry - track which modules are loaded
const MODULE_REGISTRY = {
  'config': false,
  'sections': false,
  'voice': false,
  'ask': false,
  'news': false,
  'trending': false,
  'quiz': false,
  'calculator': false,
  'pdf-upload': false,
  'advocates': false,
  'community': false,
  'helpline': false,
  'legal-aid': false,
  'dictionary': false,
  'landmark': false,
  'funny': false,
  'mock': false,
  'bail-guide': false,
  'safety': false,
  'cause-list': false,
  'videos': false,
  'resources': false,
  'exam-prep': false,
  'blog-rss': false,
  'dashboard': false,
  'converter': false,
  'notice-generator': false,
  'suggestions': false,
  'timeline': false,
  'summarizer': false,
  'post-fir': false,
  'case-track': false,
  'section-finder': false,
  'ai-doc': false,
  'junior': false,
  'family': false,
  'cyber': false,
  'zameen': false,
  'all-courts': false,
  'rto-rti': false,
  'bare-act': false,
  'dailyquiz': false,
  'donate': false,
  'payment': false
};

// ===== HEALTH CHECK FUNCTION =====
function checkHealth() {
  const result = {
    status: 'healthy',
    initialized: HEALTH_STATUS.initialized,
    modules: { ...MODULE_REGISTRY },
    errors: HEALTH_STATUS.errors,
    timestamp: new Date().toISOString()
  };
  
  for (const [key, value] of Object.entries(MODULE_REGISTRY)) {
    const functionName = 'load' + key.charAt(0).toUpperCase() + key.slice(1);
    const varName = key.replace(/-/g, '_');
    if (typeof window[functionName] === 'function' || typeof window[varName] !== 'undefined') {
      MODULE_REGISTRY[key] = true;
    }
  }
  
  const loadedCount = Object.values(MODULE_REGISTRY).filter(v => v === true).length;
  const totalCount = Object.keys(MODULE_REGISTRY).length;
  
  result.loaded_modules = loadedCount;
  result.total_modules = totalCount;
  result.percentage = Math.round((loadedCount / totalCount) * 100);
  
  if (loadedCount < 20) {
    result.status = 'degraded';
  } else if (loadedCount < 10) {
    result.status = 'critical';
  }
  
  return result;
}

// ===== CHECK API FILES =====
function checkAPIFiles() {
  const files = [
    'config.js', 'sections.js', 'voice.js', 'ask.js', 'news.js',
    'trending.js', 'quiz.js', 'calculator.js', 'pdf-upload.js',
    'advocates.js', 'community.js', 'helpline.js', 'legal-aid.js',
    'dictionary.js', 'landmark.js', 'funny.js', 'mock.js',
    'bail-guide.js', 'safety.js', 'cause-list.js', 'videos.js',
    'resources.js', 'exam-prep.js', 'blog-rss.js', 'dashboard.js',
    'converter.js', 'notice-generator.js', 'suggestions.js',
    'timeline.js', 'summarizer.js', 'post-fir.js', 'case-track.js',
    'section-finder.js', 'ai-doc.js', 'junior.js', 'family.js',
    'cyber.js', 'zameen.js', 'all-courts.js', 'rto-rti.js',
    'bare-act.js', 'dailyquiz.js', 'donate.js', 'payment.js'
  ];
  
  const results = {};
  files.forEach(file => {
    const path = 'api/' + file;
    const script = document.querySelector(`script[src="${path}"]`);
    results[file] = {
      path: path,
      loaded: !!script,
      exists: script !== null
    };
  });
  
  return results;
}

// ===== CHECK ALL FUNCTIONS =====
function checkAllFunctions() {
  const functions = [
    'switchTab', 'handleZeenatQuery', 'quickZeenat', 'toggleVoiceTyping',
    'toggleVoiceOutput', 'speakText', 'getEnhancedAIResponse',
    'loadConverter', 'loadSmartSearch', 'loadTrending', 'loadCyber',
    'loadZameen', 'loadFamily', 'loadAllCourts', 'loadRtoRti',
    'loadJunior', 'loadAIDoc', 'loadBlogRSS', 'loadCases',
    'loadLiveNews', 'loadDashboard', 'loadSources', 'loadQuiz',
    'loadResources', 'loadExamPrep', 'loadCommunity', 'loadDictionary',
    'loadLandmark', 'loadFunny', 'loadMock', 'loadPostFIR',
    'loadCaseTrack', 'loadBailGuide', 'loadSectionFinder',
    'loadNoticeGenerator', 'loadSuggestions', 'loadCalculatorGrid',
    'loadTimeline', 'loadSummarizer', 'loadSafety', 'loadDailyQuiz',
    'loadHelpline', 'loadCauseList', 'loadLegalAid', 'loadBareAct',
    'loadVideos', 'loadDonate', 'renderSections', 'searchDictionary'
  ];
  
  const results = {};
  functions.forEach(fn => {
    results[fn] = typeof window[fn] === 'function';
  });
  
  return results;
}

// ===== DISPLAY HEALTH STATUS =====
function displayHealthStatus() {
  const health = checkHealth();
  const files = checkAPIFiles();
  const functions = checkAllFunctions();
  
  console.log('='.repeat(60));
  console.log('🏥 LUCKNOW KANOON SAHAYAK 9.0 - HEALTH STATUS');
  console.log('='.repeat(60));
  console.log(`📊 Status: ${health.status.toUpperCase()}`);
  console.log(`📅 Timestamp: ${health.timestamp}`);
  console.log(`📦 Modules Loaded: ${health.loaded_modules}/${health.total_modules} (${health.percentage}%)`);
  console.log('-'.repeat(60));
  
  console.log('\n📁 API FILES:');
  const loadedFiles = Object.entries(files).filter(([k,v]) => v.loaded);
  const missingFiles = Object.entries(files).filter(([k,v]) => !v.loaded);
  console.log(`   ✅ Loaded: ${loadedFiles.length}/${Object.keys(files).length}`);
  if (missingFiles.length > 0) {
    console.log(`   ❌ Missing: ${missingFiles.map(([k]) => k).join(', ')}`);
  }
  
  console.log('\n🔧 FUNCTIONS:');
  const workingFns = Object.entries(functions).filter(([k,v]) => v);
  const brokenFns = Object.entries(functions).filter(([k,v]) => !v);
  console.log(`   ✅ Working: ${workingFns.length}/${Object.keys(functions).length}`);
  if (brokenFns.length > 0) {
    console.log(`   ❌ Broken: ${brokenFns.map(([k]) => k).join(', ')}`);
  }
  
  console.log('\n🧠 ZEENAT AI:');
  console.log(`   ${typeof getEnhancedAIResponse === 'function' ? '✅ Brain Active' : '❌ Brain Not Loaded'}`);
  console.log(`   ${typeof speakText === 'function' ? '✅ Voice System Active' : '❌ Voice System Not Loaded'}`);
  
  console.log('='.repeat(60));
  console.log('✅ Health check complete!');
}

// ===== GET HEALTH AS JSON =====
function getHealthJSON() {
  const health = checkHealth();
  const files = checkAPIFiles();
  const functions = checkAllFunctions();
  
  return {
    status: health.status,
    initialized: health.initialized,
    timestamp: health.timestamp,
    modules: {
      loaded: health.loaded_modules,
      total: health.total_modules,
      percentage: health.percentage,
      details: MODULE_REGISTRY
    },
    files: files,
    functions: functions,
    zeenat: {
      brain: typeof getEnhancedAIResponse === 'function',
      voice: typeof speakText === 'function',
      chat: typeof handleZeenatQuery === 'function'
    }
  };
}

// ===== INITIALIZE ALL MODULES =====
function initAllModules() {
  console.log('🚀 Initializing all modules...');
  
  const moduleLoaders = [
    { name: 'Trending', fn: 'loadTrending' },
    { name: 'Cases', fn: 'loadCases' },
    { name: 'Live News', fn: 'loadLiveNews' },
    { name: 'Landmark', fn: 'loadLandmark' },
    { name: 'Funny', fn: 'loadFunny' },
    { name: 'Bare Act', fn: 'loadBareAct' },
    { name: 'Daily Quiz', fn: 'loadDailyQuiz' },
    { name: 'Calculator', fn: 'loadCalculatorGrid' },
    { name: 'Helpline', fn: 'loadHelpline' },
    { name: 'Videos', fn: 'loadVideos' }
  ];
  
  let loaded = 0;
  let failed = 0;
  
  moduleLoaders.forEach(item => {
    try {
      if (typeof window[item.fn] === 'function') {
        window[item.fn]();
        loaded++;
        console.log(`   ✅ ${item.name} loaded`);
      } else {
        console.log(`   ⚠️ ${item.name} not available`);
      }
    } catch (e) {
      failed++;
      console.log(`   ❌ ${item.name} failed: ${e.message}`);
      HEALTH_STATUS.errors.push(`${item.name}: ${e.message}`);
    }
  });
  
  // ✅ Tabs ke liye fix - HTML wala switchTab use karein
  if (typeof window.switchTab !== 'function') {
    console.warn('⚠️ switchTab not found, defining fallback...');
    window.switchTab = function(tabId, btn) {
      console.log('🔄 Switching to tab:', tabId);
      
      document.querySelectorAll('.tab-content').forEach(function(el) {
        el.classList.remove('active');
      });
      
      document.querySelectorAll('.tab-btn').forEach(function(el) {
        el.classList.remove('active');
      });
      
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
  
  HEALTH_STATUS.initialized = true;
  HEALTH_STATUS.timestamp = new Date().toISOString();
  
  console.log(`\n📊 Init complete: ${loaded} loaded, ${failed} failed`);
  
  displayHealthStatus();
  
  return { loaded, failed };
}

// ===== EXPOSE HEALTH ROUTE =====
window.__health = {
  check: checkHealth,
  json: getHealthJSON,
  files: checkAPIFiles,
  functions: checkAllFunctions,
  display: displayHealthStatus,
  modules: MODULE_REGISTRY,
  status: HEALTH_STATUS
};

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', function() {
  console.log('🏥 Running health check...');
  
  setTimeout(() => {
    initAllModules();
  }, 500);
});

console.log('✅ init.js loaded - Health check available');
console.log('📋 Type __health.display() for status');
console.log('📋 Type __health.json() for JSON response');
