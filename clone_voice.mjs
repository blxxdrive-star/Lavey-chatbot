import fs from 'fs';
import fetch from 'node-fetch';
import FormData from 'form-data';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_NAME = 'Custom Voice Clone';
const VOICE_DESCRIPTION = 'Anton LaVey chatbot voice';

async function cloneVoice() {
  try {
    console.log('🎤 Starting voice cloning process...');
    
    // Read the voice sample file
    const voiceFile = fs.createReadStream('/home/ubuntu/lavey_chatbot/voice_sample.mp3');
    
    // Create form data
    const form = new FormData();
    form.append('name', VOICE_NAME);
    form.append('description', VOICE_DESCRIPTION);
    form.append('files', voiceFile);
    
    // Call ElevenLabs voice cloning API
    console.log('📤 Uploading voice sample to ElevenLabs...');
    const response = await fetch('https://api.elevenlabs.io/v1/voices/add', {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: form,
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Error response:', error);
      throw new Error(`Voice cloning failed: ${response.status} ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('✅ Voice cloned successfully!');
    console.log('🎯 Voice ID:', result.voice_id);
    console.log('📝 Voice Name:', result.name);
    
    // Save the voice ID to a config file
    fs.writeFileSync('/home/ubuntu/lavey_chatbot/voice_config.json', JSON.stringify({
      voice_id: result.voice_id,
      voice_name: result.name,
      created_at: new Date().toISOString(),
    }, null, 2));
    
    console.log('💾 Voice ID saved to voice_config.json');
    console.log('\n✨ Your custom voice clone is ready to use!');
    
  } catch (error) {
    console.error('❌ Error during voice cloning:', error.message);
    process.exit(1);
  }
}

cloneVoice();
