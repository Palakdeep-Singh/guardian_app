
'use server';
/**
 * @fileOverview A theft reporting AI agent.
 *
 * - reportTheft - A function that handles the theft reporting process.
 * - TheftReportInput - The input type for the reportTheft function.
 * - TheftReport - The return type for the reportTheft function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TheftReportInputSchema = z.object({
  latitude: z.number().describe('The latitude of the theft.'),
  longitude: z.number().describe('The longitude of the theft.'),
});
export type TheftReportInput = z.infer<typeof TheftReportInputSchema>;

const TheftReportSchema = z.object({
    time: z.string().describe("The time of the theft in a human-readable format."),
    location: z.string().describe("A human-readable description of the theft location."),
    report: z.string().describe("A concise report of the theft."),
    callScript: z.string().describe("A script for an automated call to an emergency contact informing them of the theft and location.")
});
export type TheftReport = z.infer<typeof TheftReportSchema>;

export async function reportTheft(input: TheftReportInput): Promise<TheftReport> {
  return reportTheftFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reportTheftPrompt',
  input: {schema: TheftReportInputSchema},
  output: {schema: TheftReportSchema},
  prompt: `You are a vehicle assistant AI. A theft has been reported at latitude {{latitude}} and longitude {{longitude}}. 
  
  Generate a concise report.
  Provide the current time.
  Provide a human-readable location from the coordinates.
  Create a script for an automated call to an emergency contact informing them of the theft and location.`,
});

const reportTheftFlow = ai.defineFlow(
  {
    name: 'reportTheftFlow',
    inputSchema: TheftReportInputSchema,
    outputSchema: TheftReportSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
