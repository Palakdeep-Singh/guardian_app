
'use server';

/**
 * @fileOverview A Text-to-Speech (TTS) service using Genkit.
 *
 * - generateAudio - Converts text to an audio data URI.
 * - AudioInput - The input type for the generateAudio function.
 * - AudioResponse - The return type for the generateAudio function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';

export const AudioInputSchema = z.object({
  text: z.string().describe("The text to convert to speech."),
});
export type AudioInput = z.infer<typeof AudioInputSchema>;

export const AudioResponseSchema = z.object({
  media: z.string().describe("The audio data URI in WAV format."),
});
export type AudioResponse = z.infer<typeof AudioResponseSchema>;

export async function generateAudio(input: AudioInput): Promise<AudioResponse> {
  return ttsFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', (d) => {
      bufs.push(d);
    });
    writer.on('end', () => {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const ttsFlow = ai.defineFlow(
  {
    name: 'ttsFlow',
    inputSchema: AudioInputSchema,
    outputSchema: AudioResponseSchema,
  },
  async ({ text }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: text,
    });
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    return {
      media: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
    };
  }
);
