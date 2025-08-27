
'use server';
/**
 * @fileOverview A medical emergency reporting AI agent.
 *
 * - reportMedicalEmergency - A function that handles the medical emergency reporting process.
 * - MedicalEmergencyReportInput - The input type for the reportMedicalEmergency function.
 * - MedicalEmergencyReport - The return type for the reportMedicalEmergency function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicalEmergencyReportInputSchema = z.object({
  latitude: z.number().describe('The latitude of the medical emergency.'),
  longitude: z.number().describe('The longitude of the medical emergency.'),
});
export type MedicalEmergencyReportInput = z.infer<typeof MedicalEmergencyReportInputSchema>;

const MedicalEmergencyReportSchema = z.object({
    time: z.string().describe("The time of the medical emergency in a human-readable format."),
    location: z.string().describe("A human-readable description of the medical emergency location."),
    report: z.string().describe("A concise report of the medical emergency."),
    callScript: z.string().describe("A script for an automated call to an emergency contact informing them of the medical emergency and location.")
});
export type MedicalEmergencyReport = z.infer<typeof MedicalEmergencyReportSchema>;

export async function reportMedicalEmergency(input: MedicalEmergencyReportInput): Promise<MedicalEmergencyReport> {
  return reportMedicalEmergencyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reportMedicalEmergencyPrompt',
  input: {schema: MedicalEmergencyReportInputSchema},
  output: {schema: MedicalEmergencyReportSchema},
  prompt: `You are a vehicle assistant AI. A medical emergency has been reported at latitude {{latitude}} and longitude {{longitude}}. 
  
  Generate a concise report.
  Provide the current time.
  Provide a human-readable location from the coordinates.
  Create a script for an automated call to an emergency contact informing them of the medical emergency and location.`,
});

const reportMedicalEmergencyFlow = ai.defineFlow(
  {
    name: 'reportMedicalEmergencyFlow',
    inputSchema: MedicalEmergencyReportInputSchema,
    outputSchema: MedicalEmergencyReportSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
