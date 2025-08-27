
'use server';
/**
 * @fileOverview An accident reporting AI agent.
 *
 * - reportAccident - A function that handles the accident reporting process.
 * - AccidentReportInput - The input type for the reportAccident function.
 * - AccidentReport - The return type for the reportAccident function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const AccidentReportInputSchema = z.object({
  latitude: z.number().describe('The latitude of the accident.'),
  longitude: z.number().describe('The longitude of the accident.'),
});
export type AccidentReportInput = z.infer<typeof AccidentReportInputSchema>;

export const AccidentReportSchema = z.object({
    time: z.string().describe("The time of the accident in a human-readable format."),
    location: z.string().describe("A human-readable description of the accident location."),
    report: z.string().describe("A concise report of the accident."),
    callScript: z.string().describe("A script for an automated call to an emergency contact.")
});
export type AccidentReport = z.infer<typeof AccidentReportSchema>;

export async function reportAccident(input: AccidentReportInput): Promise<AccidentReport> {
  return reportAccidentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reportAccidentPrompt',
  input: {schema: AccidentReportInputSchema},
  output: {schema: AccidentReportSchema},
  prompt: `You are a vehicle assistant AI. An accident has been detected at latitude {{latitude}} and longitude {{longitude}}. 
  
  Generate a concise report.
  Provide the current time.
  Provide a human-readable location from the coordinates.
  Create a script for an automated call to an emergency contact informing them of the accident and location.`,
});

const reportAccidentFlow = ai.defineFlow(
  {
    name: 'reportAccidentFlow',
    inputSchema: AccidentReportInputSchema,
    outputSchema: AccidentReportSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
