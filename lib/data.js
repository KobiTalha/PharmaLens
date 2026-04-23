// PharmaLens Drug Data - Part 1 (Base)
// More drugs added via data2.js, data3.js
const drugs = [
{id:'d001',generic_name:'Paracetamol',category:'Fever & Pain',description:'Analgesic and antipyretic used for fever and mild to moderate pain.',usage_info:'500-1000mg every 4-6 hours. Max 4g/day.',dosage_type:'Tablet, Syrup, Suppository',aliases:['Acetaminophen','APAP'],brands:[
{id:'b001',name:'Napa',company:'Beximco Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b002',name:'Napa Extra',company:'Beximco Pharmaceuticals',dosage:'500mg+65mg Caffeine',form:'Tablet'},
{id:'b003',name:'Ace',company:'Square Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b004',name:'Ace Plus',company:'Square Pharmaceuticals',dosage:'500mg+65mg',form:'Tablet'},
{id:'b005',name:'Fast',company:'ACME Laboratories',dosage:'500mg',form:'Tablet'},
{id:'b006',name:'Reset',company:'Incepta Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b007',name:'Renova',company:'Opsonin Pharma',dosage:'500mg',form:'Tablet'},
{id:'b008',name:'Xpa',company:'Aristopharma',dosage:'500mg',form:'Tablet'},
{id:'b009',name:'Sinapol',company:'Ibn Sina Pharmaceuticals',dosage:'500mg',form:'Tablet'}]},
{id:'d002',generic_name:'Ibuprofen',category:'Fever & Pain',description:'NSAID for pain, inflammation, and fever.',usage_info:'200-400mg every 4-6 hours. Max 1.2g/day.',dosage_type:'Tablet, Syrup',aliases:['Brufen'],brands:[
{id:'b010',name:'Profen',company:'Square Pharmaceuticals',dosage:'400mg',form:'Tablet'},
{id:'b011',name:'Inflam',company:'Beximco Pharmaceuticals',dosage:'400mg',form:'Tablet'},
{id:'b012',name:'Ibufen',company:'ACME Laboratories',dosage:'400mg',form:'Tablet'},
{id:'b013',name:'Reumon',company:'Incepta Pharmaceuticals',dosage:'400mg',form:'Tablet'},
{id:'b014',name:'Advel',company:'ACI Limited',dosage:'400mg',form:'Tablet'}]},
{id:'d003',generic_name:'Diclofenac Sodium',category:'Fever & Pain',description:'NSAID for moderate pain, arthritis, and inflammation.',usage_info:'50mg 2-3 times daily with food.',dosage_type:'Tablet, Gel, Injection',aliases:['Diclofenac','Voltaren'],brands:[
{id:'b015',name:'Clofenac',company:'Square Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b016',name:'Voltalin',company:'ACME Laboratories',dosage:'50mg',form:'Tablet'},
{id:'b017',name:'Diclofen',company:'Incepta Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b018',name:'A-Fenac',company:'Aristopharma',dosage:'50mg',form:'Tablet'},
{id:'b019',name:'Dyclo',company:'Beximco Pharmaceuticals',dosage:'50mg',form:'Tablet'}]},
{id:'d004',generic_name:'Naproxen',category:'Fever & Pain',description:'NSAID for pain, inflammation, and menstrual cramps.',usage_info:'250-500mg twice daily.',dosage_type:'Tablet',aliases:['Naprosyn'],brands:[
{id:'b020',name:'Napsyn',company:'Square Pharmaceuticals',dosage:'250mg',form:'Tablet'},
{id:'b021',name:'Napro-A',company:'ACME Laboratories',dosage:'250mg',form:'Tablet'},
{id:'b022',name:'Sonap',company:'Aristopharma',dosage:'500mg',form:'Tablet'},
{id:'b023',name:'Xenapro',company:'Beximco Pharmaceuticals',dosage:'250mg',form:'Tablet'}]},
{id:'d005',generic_name:'Ketorolac',category:'Fever & Pain',description:'NSAID for short-term management of moderate to severe pain.',usage_info:'10mg every 4-6 hours. Max 5 days.',dosage_type:'Tablet, Injection',aliases:['Toradol'],brands:[
{id:'b024',name:'Toradol',company:'Square Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b025',name:'Ketoral',company:'Incepta Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b026',name:'Keron',company:'Beximco Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b027',name:'Rolac',company:'Healthcare Pharmaceuticals',dosage:'10mg',form:'Tablet'}]},
{id:'d006',generic_name:'Amoxicillin',category:'Antibiotics',description:'Broad-spectrum penicillin antibiotic for bacterial infections.',usage_info:'250-500mg every 8 hours for 7-10 days.',dosage_type:'Capsule, Syrup',aliases:['Amoxil'],brands:[
{id:'b028',name:'Moxacil',company:'Square Pharmaceuticals',dosage:'500mg',form:'Capsule'},
{id:'b029',name:'Fimoxyl',company:'Beximco Pharmaceuticals',dosage:'500mg',form:'Capsule'},
{id:'b030',name:'Tycil',company:'Beximco Pharmaceuticals',dosage:'250mg',form:'Capsule'},
{id:'b031',name:'Moxilin',company:'ACME Laboratories',dosage:'500mg',form:'Capsule'},
{id:'b032',name:'Moxin',company:'Opsonin Pharma',dosage:'500mg',form:'Capsule'},
{id:'b033',name:'Demoxil',company:'Drug International',dosage:'500mg',form:'Capsule'},
{id:'b034',name:'Avlomox',company:'ACI Limited',dosage:'500mg',form:'Capsule'}]},
{id:'d007',generic_name:'Azithromycin',category:'Antibiotics',description:'Macrolide antibiotic for respiratory, skin, and ear infections.',usage_info:'500mg once daily for 3 days.',dosage_type:'Tablet, Syrup',aliases:['Zithromax','Z-pack'],brands:[
{id:'b035',name:'Zimax',company:'Square Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b036',name:'Azith',company:'Beximco Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b037',name:'Azithrocin',company:'ACME Laboratories',dosage:'500mg',form:'Tablet'},
{id:'b038',name:'Azifast',company:'Incepta Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b039',name:'Zithrox',company:'Healthcare Pharmaceuticals',dosage:'250mg',form:'Tablet'},
{id:'b040',name:'Azomax',company:'ACI Limited',dosage:'500mg',form:'Tablet'}]},
{id:'d008',generic_name:'Ciprofloxacin',category:'Antibiotics',description:'Fluoroquinolone antibiotic for UTI, respiratory, and GI infections.',usage_info:'250-500mg twice daily for 7-14 days.',dosage_type:'Tablet, IV',aliases:['Cipro'],brands:[
{id:'b041',name:'Ciproxin',company:'Square Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b042',name:'Ciprocin',company:'Beximco Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b043',name:'Cipro-A',company:'ACME Laboratories',dosage:'500mg',form:'Tablet'},
{id:'b044',name:'Neofloxin',company:'Incepta Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b045',name:'Floxacin',company:'ACI Limited',dosage:'500mg',form:'Tablet'}]},
{id:'d009',generic_name:'Cefixime',category:'Antibiotics',description:'Third-gen cephalosporin for UTI, pharyngitis, and bronchitis.',usage_info:'200-400mg once daily for 7-14 days.',dosage_type:'Capsule, Syrup',aliases:['Suprax'],brands:[
{id:'b046',name:'Cef-3',company:'Square Pharmaceuticals',dosage:'200mg',form:'Capsule'},
{id:'b047',name:'Cefim',company:'Healthcare Pharmaceuticals',dosage:'200mg',form:'Capsule'},
{id:'b048',name:'Fixim',company:'Incepta Pharmaceuticals',dosage:'200mg',form:'Capsule'},
{id:'b049',name:'Cefimax',company:'Aristopharma',dosage:'400mg',form:'Capsule'},
{id:'b050',name:'Cefixim',company:'ACME Laboratories',dosage:'200mg',form:'Capsule'}]},
{id:'d010',generic_name:'Metronidazole',category:'Antibiotics',description:'Antiprotozoal and antibacterial for anaerobic infections.',usage_info:'400mg three times daily for 5-7 days.',dosage_type:'Tablet, IV, Gel',aliases:['Flagyl'],brands:[
{id:'b051',name:'Flagyl',company:'Sanofi Bangladesh',dosage:'400mg',form:'Tablet'},
{id:'b052',name:'Filmet',company:'Square Pharmaceuticals',dosage:'400mg',form:'Tablet'},
{id:'b053',name:'Amodis',company:'Beximco Pharmaceuticals',dosage:'400mg',form:'Tablet'},
{id:'b054',name:'Metro',company:'ACME Laboratories',dosage:'400mg',form:'Tablet'},
{id:'b055',name:'Metrin',company:'Incepta Pharmaceuticals',dosage:'400mg',form:'Tablet'}]},
{id:'d011',generic_name:'Levofloxacin',category:'Antibiotics',description:'Fluoroquinolone for pneumonia, sinusitis, UTI.',usage_info:'500mg once daily for 7-14 days.',dosage_type:'Tablet, IV',aliases:['Levaquin'],brands:[
{id:'b056',name:'Lebac',company:'Square Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b057',name:'Levoxa',company:'Beximco Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b058',name:'Levocin',company:'Incepta Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b059',name:'Loxof',company:'Aristopharma',dosage:'500mg',form:'Tablet'},
{id:'b060',name:'Levo',company:'Eskayef Pharmaceuticals',dosage:'500mg',form:'Tablet'}]},
{id:'d012',generic_name:'Doxycycline',category:'Antibiotics',description:'Tetracycline antibiotic for acne, UTI, respiratory infections.',usage_info:'100mg twice daily for 7-10 days.',dosage_type:'Capsule',aliases:['Vibramycin'],brands:[
{id:'b061',name:'Doxicap',company:'Square Pharmaceuticals',dosage:'100mg',form:'Capsule'},
{id:'b062',name:'Doxylin',company:'ACME Laboratories',dosage:'100mg',form:'Capsule'},
{id:'b063',name:'Doxin',company:'Incepta Pharmaceuticals',dosage:'100mg',form:'Capsule'},
{id:'b064',name:'Docyclin',company:'Beximco Pharmaceuticals',dosage:'100mg',form:'Capsule'}]},
{id:'d013',generic_name:'Ceftriaxone',category:'Antibiotics',description:'Third-gen cephalosporin injectable for severe infections.',usage_info:'1-2g IV/IM once daily.',dosage_type:'Injection',aliases:['Rocephin'],brands:[
{id:'b065',name:'Triject',company:'Square Pharmaceuticals',dosage:'1g',form:'Injection'},
{id:'b066',name:'Ceftron',company:'Incepta Pharmaceuticals',dosage:'1g',form:'Injection'},
{id:'b067',name:'Oricef',company:'Aristopharma',dosage:'1g',form:'Injection'},
{id:'b068',name:'Ceftrex',company:'Renata Limited',dosage:'1g',form:'Injection'},
{id:'b069',name:'Tycef',company:'Beximco Pharmaceuticals',dosage:'1g',form:'Injection'}]},
{id:'d014',generic_name:'Amoxicillin+Clavulanic Acid',category:'Antibiotics',description:'Combination antibiotic for resistant bacterial infections.',usage_info:'625mg every 8 hours for 7 days.',dosage_type:'Tablet, Syrup',aliases:['Augmentin','Co-amoxiclav'],brands:[
{id:'b070',name:'Moxaclav',company:'Square Pharmaceuticals',dosage:'625mg',form:'Tablet'},
{id:'b071',name:'Fimoxyclav',company:'Beximco Pharmaceuticals',dosage:'625mg',form:'Tablet'},
{id:'b072',name:'Clavumax',company:'Incepta Pharmaceuticals',dosage:'625mg',form:'Tablet'},
{id:'b073',name:'Augmex',company:'ACME Laboratories',dosage:'625mg',form:'Tablet'},
{id:'b074',name:'Amoclav',company:'Techno Drugs',dosage:'625mg',form:'Tablet'},
{id:'b075',name:'Clavam',company:'Aristopharma',dosage:'625mg',form:'Tablet'}]},
{id:'d015',generic_name:'Clindamycin',category:'Dental & Oral',description:'Lincosamide antibiotic for dental, bone, and skin infections.',usage_info:'150-300mg every 6 hours.',dosage_type:'Capsule, Injection',aliases:[],brands:[
{id:'b076',name:'Clindacin',company:'Square Pharmaceuticals',dosage:'300mg',form:'Capsule'},
{id:'b077',name:'Clindasol',company:'Incepta Pharmaceuticals',dosage:'300mg',form:'Capsule'},
{id:'b078',name:'Dalacin',company:'Beximco Pharmaceuticals',dosage:'150mg',form:'Capsule'},
{id:'b079',name:'Clinda',company:'ACME Laboratories',dosage:'300mg',form:'Capsule'}]},
{id:'d016',generic_name:'Omeprazole',category:'Gastric & Digestive',description:'Proton pump inhibitor for GERD, ulcers, and acid reflux.',usage_info:'20mg once daily before breakfast for 4-8 weeks.',dosage_type:'Capsule',aliases:['Prilosec'],brands:[
{id:'b080',name:'Seclo',company:'Square Pharmaceuticals',dosage:'20mg',form:'Capsule'},
{id:'b081',name:'Losectil',company:'Beximco Pharmaceuticals',dosage:'20mg',form:'Capsule'},
{id:'b082',name:'Omep',company:'ACME Laboratories',dosage:'20mg',form:'Capsule'},
{id:'b083',name:'Provacid',company:'Incepta Pharmaceuticals',dosage:'20mg',form:'Capsule'},
{id:'b084',name:'Omidon',company:'Opsonin Pharma',dosage:'20mg',form:'Capsule'},
{id:'b085',name:'Omeprol',company:'ACI Limited',dosage:'20mg',form:'Capsule'}]},
{id:'d017',generic_name:'Esomeprazole',category:'Gastric & Digestive',description:'PPI for GERD, erosive esophagitis, and H. pylori.',usage_info:'20-40mg once daily.',dosage_type:'Capsule, Tablet',aliases:['Nexium'],brands:[
{id:'b086',name:'Maxpro',company:'Renata Limited',dosage:'20mg',form:'Capsule'},
{id:'b087',name:'Nexum',company:'Square Pharmaceuticals',dosage:'20mg',form:'Capsule'},
{id:'b088',name:'Sergel',company:'Healthcare Pharmaceuticals',dosage:'20mg',form:'Capsule'},
{id:'b089',name:'Esonix',company:'Beximco Pharmaceuticals',dosage:'20mg',form:'Capsule'},
{id:'b090',name:'Esoral',company:'Incepta Pharmaceuticals',dosage:'40mg',form:'Capsule'},
{id:'b091',name:'Esomep',company:'Aristopharma',dosage:'20mg',form:'Capsule'}]},
{id:'d018',generic_name:'Pantoprazole',category:'Gastric & Digestive',description:'PPI for peptic ulcers and GERD.',usage_info:'40mg once daily before breakfast.',dosage_type:'Tablet, IV',aliases:['Protonix'],brands:[
{id:'b092',name:'Pantonix',company:'Square Pharmaceuticals',dosage:'40mg',form:'Tablet'},
{id:'b093',name:'Pantid',company:'Incepta Pharmaceuticals',dosage:'40mg',form:'Tablet'},
{id:'b094',name:'Panto',company:'ACME Laboratories',dosage:'40mg',form:'Tablet'},
{id:'b095',name:'Topraz',company:'Beximco Pharmaceuticals',dosage:'40mg',form:'Tablet'},
{id:'b096',name:'Panoral',company:'Opsonin Pharma',dosage:'40mg',form:'Tablet'}]},
{id:'d019',generic_name:'Ranitidine',category:'Gastric & Digestive',description:'H2 blocker for gastric/duodenal ulcers and GERD.',usage_info:'150mg twice daily or 300mg at bedtime.',dosage_type:'Tablet, Syrup',aliases:['Zantac'],brands:[
{id:'b097',name:'Neotack',company:'Square Pharmaceuticals',dosage:'150mg',form:'Tablet'},
{id:'b098',name:'Ranitid',company:'ACME Laboratories',dosage:'150mg',form:'Tablet'},
{id:'b099',name:'Ranix',company:'Beximco Pharmaceuticals',dosage:'150mg',form:'Tablet'},
{id:'b100',name:'Rantid',company:'Incepta Pharmaceuticals',dosage:'150mg',form:'Tablet'}]},
{id:'d020',generic_name:'Domperidone',category:'Gastric & Digestive',description:'Antiemetic for nausea, vomiting, and bloating.',usage_info:'10mg three times daily before meals.',dosage_type:'Tablet, Syrup',aliases:['Motilium'],brands:[
{id:'b101',name:'Motid',company:'Square Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b102',name:'Omidon',company:'Incepta Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b103',name:'Domerin',company:'ACME Laboratories',dosage:'10mg',form:'Tablet'},
{id:'b104',name:'Domitil',company:'Beximco Pharmaceuticals',dosage:'10mg',form:'Tablet'}]},
{id:'d021',generic_name:'Amlodipine',category:'Heart & Blood Pressure',description:'Calcium channel blocker for hypertension and angina.',usage_info:'5-10mg once daily.',dosage_type:'Tablet',aliases:['Norvasc'],brands:[
{id:'b105',name:'Amdocal',company:'Square Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b106',name:'Amlopin',company:'Beximco Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b107',name:'Amlod',company:'ACME Laboratories',dosage:'5mg',form:'Tablet'},
{id:'b108',name:'Amlocor',company:'Incepta Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b109',name:'Amlosyn',company:'ACI Limited',dosage:'5mg',form:'Tablet'},
{id:'b110',name:'Camlodin',company:'Aristopharma',dosage:'5mg',form:'Tablet'}]},
{id:'d022',generic_name:'Losartan',category:'Heart & Blood Pressure',description:'ARB for hypertension and diabetic nephropathy.',usage_info:'50-100mg once daily.',dosage_type:'Tablet',aliases:['Cozaar'],brands:[
{id:'b111',name:'Losatan',company:'Square Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b112',name:'Angiloc',company:'Beximco Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b113',name:'Losar',company:'Incepta Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b114',name:'Losium',company:'ACME Laboratories',dosage:'50mg',form:'Tablet'},
{id:'b115',name:'Prezar',company:'Healthcare Pharmaceuticals',dosage:'50mg',form:'Tablet'}]},
{id:'d023',generic_name:'Atenolol',category:'Heart & Blood Pressure',description:'Beta-blocker for hypertension, angina, and arrhythmias.',usage_info:'25-100mg once daily.',dosage_type:'Tablet',aliases:['Tenormin'],brands:[
{id:'b116',name:'Tenoren',company:'Square Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b117',name:'Atcard',company:'Beximco Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b118',name:'Atolol',company:'Incepta Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b119',name:'Betanol',company:'ACME Laboratories',dosage:'50mg',form:'Tablet'}]},
{id:'d024',generic_name:'Clopidogrel',category:'Heart & Blood Pressure',description:'Antiplatelet agent to prevent heart attacks and strokes.',usage_info:'75mg once daily.',dosage_type:'Tablet',aliases:['Plavix'],brands:[
{id:'b120',name:'Clopilet',company:'Square Pharmaceuticals',dosage:'75mg',form:'Tablet'},
{id:'b121',name:'Plavix',company:'Sanofi Bangladesh',dosage:'75mg',form:'Tablet'},
{id:'b122',name:'Clopid',company:'Incepta Pharmaceuticals',dosage:'75mg',form:'Tablet'},
{id:'b123',name:'Clodrel',company:'Beximco Pharmaceuticals',dosage:'75mg',form:'Tablet'},
{id:'b124',name:'Deplat',company:'ACME Laboratories',dosage:'75mg',form:'Tablet'}]},
{id:'d025',generic_name:'Metformin',category:'Diabetes',description:'First-line oral medication for type 2 diabetes.',usage_info:'500-1000mg twice daily with meals.',dosage_type:'Tablet',aliases:['Glucophage'],brands:[
{id:'b125',name:'Comet',company:'Square Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b126',name:'Informet',company:'Incepta Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b127',name:'Metfar',company:'Beximco Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b128',name:'Bigomet',company:'ACME Laboratories',dosage:'850mg',form:'Tablet'},
{id:'b129',name:'Novamet',company:'Aristopharma',dosage:'500mg',form:'Tablet'},
{id:'b130',name:'Sucomet',company:'ACI Limited',dosage:'500mg',form:'Tablet'}]},
{id:'d026',generic_name:'Glimepiride',category:'Diabetes',description:'Sulfonylurea for type 2 diabetes.',usage_info:'1-4mg once daily before breakfast.',dosage_type:'Tablet',aliases:[],brands:[
{id:'b131',name:'Amaryl',company:'Sanofi Bangladesh',dosage:'2mg',form:'Tablet'},
{id:'b132',name:'Glimer',company:'Square Pharmaceuticals',dosage:'2mg',form:'Tablet'},
{id:'b133',name:'Glirid',company:'Incepta Pharmaceuticals',dosage:'2mg',form:'Tablet'},
{id:'b134',name:'Diapride',company:'Healthcare Pharmaceuticals',dosage:'2mg',form:'Tablet'},
{id:'b135',name:'Glimep',company:'Beximco Pharmaceuticals',dosage:'2mg',form:'Tablet'}]},
{id:'d027',generic_name:'Gliclazide',category:'Diabetes',description:'Sulfonylurea for blood sugar control in type 2 diabetes.',usage_info:'40-80mg daily with breakfast.',dosage_type:'Tablet',aliases:[],brands:[
{id:'b136',name:'Glicla',company:'Square Pharmaceuticals',dosage:'80mg',form:'Tablet'},
{id:'b137',name:'Proglic',company:'Incepta Pharmaceuticals',dosage:'80mg',form:'Tablet'},
{id:'b138',name:'Glucored',company:'Aristopharma',dosage:'80mg',form:'Tablet'},
{id:'b139',name:'Dianorm',company:'ACME Laboratories',dosage:'80mg',form:'Tablet'}]},
{id:'d028',generic_name:'Sitagliptin',category:'Diabetes',description:'DPP-4 inhibitor for type 2 diabetes.',usage_info:'100mg once daily.',dosage_type:'Tablet',aliases:['Januvia'],brands:[
{id:'b140',name:'Ista',company:'Square Pharmaceuticals',dosage:'100mg',form:'Tablet'},
{id:'b141',name:'Sitaglu',company:'Incepta Pharmaceuticals',dosage:'100mg',form:'Tablet'},
{id:'b142',name:'Gliptin',company:'Beximco Pharmaceuticals',dosage:'100mg',form:'Tablet'},
{id:'b143',name:'Sitaptin',company:'ACME Laboratories',dosage:'50mg',form:'Tablet'}]},
{id:'d029',generic_name:'Empagliflozin',category:'Diabetes',description:'SGLT2 inhibitor for type 2 diabetes with cardiovascular benefit.',usage_info:'10-25mg once daily.',dosage_type:'Tablet',aliases:['Jardiance'],brands:[
{id:'b144',name:'Empaone',company:'Square Pharmaceuticals',dosage:'25mg',form:'Tablet'},
{id:'b145',name:'Empacor',company:'Incepta Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b146',name:'Jardina',company:'Beximco Pharmaceuticals',dosage:'25mg',form:'Tablet'},
{id:'b147',name:'Emglo',company:'Aristopharma',dosage:'10mg',form:'Tablet'}]},
{id:'d030',generic_name:'Insulin Glargine',category:'Diabetes',description:'Long-acting insulin for type 1 and type 2 diabetes.',usage_info:'Individualized dose, once daily at same time.',dosage_type:'Injection',aliases:['Lantus'],brands:[
{id:'b148',name:'Insugen G',company:'Incepta Pharmaceuticals',dosage:'100IU/ml',form:'Injection'},
{id:'b149',name:'Glarine',company:'Square Pharmaceuticals',dosage:'100IU/ml',form:'Injection'},
{id:'b150',name:'Basalog',company:'Healthcare Pharmaceuticals',dosage:'100IU/ml',form:'Injection'}]},
{id:'d031',generic_name:'Salbutamol',category:'Asthma & Respiratory',description:'Short-acting bronchodilator for asthma and COPD.',usage_info:'2-4mg 3-4 times daily or 100-200mcg inhaled.',dosage_type:'Inhaler, Tablet, Syrup',aliases:['Albuterol','Ventolin'],brands:[
{id:'b151',name:'Sultolin',company:'Square Pharmaceuticals',dosage:'100mcg',form:'Inhaler'},
{id:'b152',name:'Brodil',company:'Beximco Pharmaceuticals',dosage:'100mcg',form:'Inhaler'},
{id:'b153',name:'Salbuvent',company:'Incepta Pharmaceuticals',dosage:'2mg',form:'Tablet'},
{id:'b154',name:'Ventol',company:'ACME Laboratories',dosage:'100mcg',form:'Inhaler'},
{id:'b155',name:'Asthalin',company:'ACI Limited',dosage:'100mcg',form:'Inhaler'}]},
{id:'d032',generic_name:'Montelukast',category:'Asthma & Respiratory',description:'Leukotriene receptor antagonist for asthma and allergic rhinitis.',usage_info:'10mg once daily in evening.',dosage_type:'Tablet, Chewable',aliases:['Singulair'],brands:[
{id:'b156',name:'Monas',company:'Square Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b157',name:'Montair',company:'Incepta Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b158',name:'Montiget',company:'Aristopharma',dosage:'10mg',form:'Tablet'},
{id:'b159',name:'Monkast',company:'ACME Laboratories',dosage:'10mg',form:'Tablet'},
{id:'b160',name:'Lumona',company:'Beximco Pharmaceuticals',dosage:'10mg',form:'Tablet'}]},
{id:'d033',generic_name:'Budesonide',category:'Asthma & Respiratory',description:'Inhaled corticosteroid for asthma maintenance.',usage_info:'200-400mcg twice daily via inhaler.',dosage_type:'Inhaler, Nebulizer',aliases:['Pulmicort'],brands:[
{id:'b161',name:'Budicort',company:'Square Pharmaceuticals',dosage:'200mcg',form:'Inhaler'},
{id:'b162',name:'Budeson',company:'Incepta Pharmaceuticals',dosage:'200mcg',form:'Inhaler'},
{id:'b163',name:'Neumol',company:'Beximco Pharmaceuticals',dosage:'200mcg',form:'Inhaler'},
{id:'b164',name:'Budasma',company:'ACME Laboratories',dosage:'200mcg',form:'Inhaler'}]},
{id:'d034',generic_name:'Fluticasone',category:'Asthma & Respiratory',description:'Corticosteroid for asthma and allergic rhinitis.',usage_info:'100-500mcg twice daily via inhaler.',dosage_type:'Inhaler, Nasal Spray',aliases:['Flonase'],brands:[
{id:'b165',name:'Flixotide',company:'Square Pharmaceuticals',dosage:'250mcg',form:'Inhaler'},
{id:'b166',name:'Fluticot',company:'Incepta Pharmaceuticals',dosage:'125mcg',form:'Inhaler'},
{id:'b167',name:'Flusal',company:'Beximco Pharmaceuticals',dosage:'250mcg',form:'Inhaler'},
{id:'b168',name:'Flunas',company:'Aristopharma',dosage:'50mcg',form:'Nasal Spray'}]},
{id:'d035',generic_name:'Theophylline',category:'Asthma & Respiratory',description:'Bronchodilator for chronic asthma and COPD.',usage_info:'200-400mg twice daily.',dosage_type:'Tablet, Syrup',aliases:[],brands:[
{id:'b169',name:'Unicontin',company:'Square Pharmaceuticals',dosage:'400mg',form:'Tablet'},
{id:'b170',name:'Theovent',company:'Beximco Pharmaceuticals',dosage:'200mg',form:'Tablet'},
{id:'b171',name:'Theobid',company:'Incepta Pharmaceuticals',dosage:'300mg',form:'Tablet'},
{id:'b172',name:'Theo-SR',company:'ACME Laboratories',dosage:'200mg',form:'Tablet'}]},
{id:'d036',generic_name:'Fexofenadine',category:'Cold & Allergy',description:'Non-sedating antihistamine for allergic rhinitis and urticaria.',usage_info:'120mg or 180mg once daily.',dosage_type:'Tablet',aliases:['Allegra'],brands:[
{id:'b173',name:'Fexo',company:'Square Pharmaceuticals',dosage:'120mg',form:'Tablet'},
{id:'b174',name:'Telfast',company:'Sanofi Bangladesh',dosage:'120mg',form:'Tablet'},
{id:'b175',name:'Fexon',company:'Incepta Pharmaceuticals',dosage:'120mg',form:'Tablet'},
{id:'b176',name:'Fexofen',company:'Beximco Pharmaceuticals',dosage:'180mg',form:'Tablet'},
{id:'b177',name:'Fexomin',company:'ACME Laboratories',dosage:'120mg',form:'Tablet'}]},
{id:'d037',generic_name:'Cetirizine',category:'Cold & Allergy',description:'Antihistamine for allergies, hay fever, and urticaria.',usage_info:'10mg once daily.',dosage_type:'Tablet, Syrup',aliases:['Zyrtec'],brands:[
{id:'b178',name:'Alatrol',company:'Square Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b179',name:'Cetzin',company:'ACME Laboratories',dosage:'10mg',form:'Tablet'},
{id:'b180',name:'Cetrin',company:'Incepta Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b181',name:'Acitrin',company:'Beximco Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b182',name:'Setrol',company:'Aristopharma',dosage:'10mg',form:'Tablet'}]},
{id:'d038',generic_name:'Loratadine',category:'Cold & Allergy',description:'Non-sedating antihistamine for allergic conditions.',usage_info:'10mg once daily.',dosage_type:'Tablet, Syrup',aliases:['Claritin'],brands:[
{id:'b183',name:'Loraday',company:'Square Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b184',name:'Loratin',company:'Incepta Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b185',name:'Histaclar',company:'Beximco Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b186',name:'Lorid',company:'ACME Laboratories',dosage:'10mg',form:'Tablet'}]},
{id:'d039',generic_name:'Levocetirizine',category:'Cold & Allergy',description:'Potent antihistamine for allergies and chronic urticaria.',usage_info:'5mg once daily in evening.',dosage_type:'Tablet',aliases:['Xyzal'],brands:[
{id:'b187',name:'Levorid',company:'Square Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b188',name:'Levotin',company:'Incepta Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b189',name:'Lecet',company:'Beximco Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b190',name:'Levocet',company:'ACME Laboratories',dosage:'5mg',form:'Tablet'}]},
{id:'d040',generic_name:'Desloratadine',category:'Cold & Allergy',description:'Long-acting antihistamine for allergic rhinitis.',usage_info:'5mg once daily.',dosage_type:'Tablet',aliases:['Aerius'],brands:[
{id:'b191',name:'Deslor',company:'Square Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b192',name:'Deslorin',company:'Incepta Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b193',name:'Dazit',company:'Beximco Pharmaceuticals',dosage:'5mg',form:'Tablet'}]},
{id:'d041',generic_name:'Sertraline',category:'Mental Health',description:'SSRI antidepressant for depression, OCD, and anxiety.',usage_info:'50-200mg once daily.',dosage_type:'Tablet',aliases:['Zoloft'],brands:[
{id:'b194',name:'Sertina',company:'Square Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b195',name:'Sertralin',company:'Incepta Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b196',name:'Sertex',company:'Beximco Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b197',name:'Serenata',company:'Aristopharma',dosage:'50mg',form:'Tablet'},
{id:'b198',name:'Zertal',company:'ACME Laboratories',dosage:'50mg',form:'Tablet'}]},
{id:'d042',generic_name:'Escitalopram',category:'Mental Health',description:'SSRI for depression and generalized anxiety disorder.',usage_info:'10-20mg once daily.',dosage_type:'Tablet',aliases:['Lexapro'],brands:[
{id:'b199',name:'Entrust',company:'Square Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b200',name:'Escipro',company:'Incepta Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b201',name:'Escilex',company:'Beximco Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b202',name:'Lexam',company:'ACME Laboratories',dosage:'10mg',form:'Tablet'},
{id:'b203',name:'Cilex',company:'Aristopharma',dosage:'10mg',form:'Tablet'}]},
{id:'d043',generic_name:'Clonazepam',category:'Mental Health',description:'Benzodiazepine for seizures and panic disorder.',usage_info:'0.5-2mg twice daily. Short-term use only.',dosage_type:'Tablet',aliases:['Klonopin','Rivotril'],brands:[
{id:'b204',name:'Rivotril',company:'Square Pharmaceuticals',dosage:'0.5mg',form:'Tablet'},
{id:'b205',name:'Clonil',company:'Incepta Pharmaceuticals',dosage:'0.5mg',form:'Tablet'},
{id:'b206',name:'Epitra',company:'Beximco Pharmaceuticals',dosage:'0.5mg',form:'Tablet'},
{id:'b207',name:'Clonex',company:'ACME Laboratories',dosage:'0.5mg',form:'Tablet'}]},
{id:'d044',generic_name:'Olanzapine',category:'Mental Health',description:'Atypical antipsychotic for schizophrenia and bipolar disorder.',usage_info:'5-20mg once daily.',dosage_type:'Tablet',aliases:['Zyprexa'],brands:[
{id:'b208',name:'Olanex',company:'Square Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b209',name:'Olapi',company:'Incepta Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b210',name:'Oleanz',company:'Beximco Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b211',name:'Olapin',company:'Aristopharma',dosage:'10mg',form:'Tablet'}]},
{id:'d045',generic_name:'Ketoconazole',category:'Skin & Dermatology',description:'Antifungal for skin fungal infections and dandruff.',usage_info:'Apply cream 1-2 times daily or 200mg oral daily.',dosage_type:'Cream, Tablet, Shampoo',aliases:['Nizoral'],brands:[
{id:'b212',name:'Nizoral',company:'Square Pharmaceuticals',dosage:'2%',form:'Cream'},
{id:'b213',name:'Ketofin',company:'Incepta Pharmaceuticals',dosage:'200mg',form:'Tablet'},
{id:'b214',name:'Funginoc',company:'Beximco Pharmaceuticals',dosage:'2%',form:'Cream'},
{id:'b215',name:'Kenazol',company:'ACME Laboratories',dosage:'2%',form:'Shampoo'}]},
{id:'d046',generic_name:'Betamethasone',category:'Skin & Dermatology',description:'Potent corticosteroid for eczema, dermatitis, and psoriasis.',usage_info:'Apply thin layer 1-2 times daily.',dosage_type:'Cream, Ointment',aliases:[],brands:[
{id:'b216',name:'Betnovate',company:'Square Pharmaceuticals',dosage:'0.1%',form:'Cream'},
{id:'b217',name:'Betagel',company:'Incepta Pharmaceuticals',dosage:'0.1%',form:'Cream'},
{id:'b218',name:'Betaderm',company:'Beximco Pharmaceuticals',dosage:'0.1%',form:'Cream'},
{id:'b219',name:'Betasol',company:'ACME Laboratories',dosage:'0.1%',form:'Ointment'},
{id:'b220',name:'Bextasone',company:'Aristopharma',dosage:'0.1%',form:'Cream'}]},
{id:'d047',generic_name:'Terbinafine',category:'Skin & Dermatology',description:'Antifungal for tinea, ringworm, and nail fungus.',usage_info:'250mg once daily for 2-6 weeks or cream topically.',dosage_type:'Tablet, Cream',aliases:['Lamisil'],brands:[
{id:'b221',name:'Terfin',company:'Square Pharmaceuticals',dosage:'250mg',form:'Tablet'},
{id:'b222',name:'Fungotek',company:'Incepta Pharmaceuticals',dosage:'1%',form:'Cream'},
{id:'b223',name:'Terbiderm',company:'Beximco Pharmaceuticals',dosage:'250mg',form:'Tablet'}]},
{id:'d048',generic_name:'Fusidic Acid',category:'Skin & Dermatology',description:'Topical antibiotic for skin infections like impetigo.',usage_info:'Apply 3-4 times daily for 7 days.',dosage_type:'Cream, Ointment',aliases:['Fucidin'],brands:[
{id:'b224',name:'Fucidin',company:'Square Pharmaceuticals',dosage:'2%',form:'Cream'},
{id:'b225',name:'Fusid',company:'Incepta Pharmaceuticals',dosage:'2%',form:'Cream'},
{id:'b226',name:'Fucimax',company:'Beximco Pharmaceuticals',dosage:'2%',form:'Cream'},
{id:'b227',name:'Fusibact',company:'ACME Laboratories',dosage:'2%',form:'Ointment'}]},
{id:'d049',generic_name:'Cholecalciferol',category:'Vitamins & Supplements',description:'Vitamin D3 for deficiency, bone health.',usage_info:'1000-2000IU daily or as directed.',dosage_type:'Capsule, Tablet',aliases:['Vitamin D3','Vitamin D'],brands:[
{id:'b228',name:'Sunny-D',company:'Square Pharmaceuticals',dosage:'2000IU',form:'Capsule'},
{id:'b229',name:'D-Rise',company:'Incepta Pharmaceuticals',dosage:'40000IU',form:'Capsule'},
{id:'b230',name:'Devit',company:'Beximco Pharmaceuticals',dosage:'2000IU',form:'Tablet'},
{id:'b231',name:'Bonvit-D',company:'Aristopharma',dosage:'1000IU',form:'Tablet'}]},
{id:'d050',generic_name:'Calcium + Vitamin D',category:'Vitamins & Supplements',description:'Supplement for calcium deficiency and osteoporosis.',usage_info:'1 tablet daily with meals.',dosage_type:'Tablet, Chewable',aliases:['Calcium supplement'],brands:[
{id:'b232',name:'Calbo-D',company:'Square Pharmaceuticals',dosage:'500mg+200IU',form:'Tablet'},
{id:'b233',name:'Calcin-D',company:'Incepta Pharmaceuticals',dosage:'500mg+200IU',form:'Tablet'},
{id:'b234',name:'Calbos',company:'Beximco Pharmaceuticals',dosage:'600mg+400IU',form:'Tablet'},
{id:'b235',name:'Oracal-D',company:'ACME Laboratories',dosage:'500mg+200IU',form:'Chewable'},
{id:'b236',name:'Calci-D',company:'Aristopharma',dosage:'500mg+200IU',form:'Tablet'}]},
{id:'d051',generic_name:'Ferrous Sulfate',category:'Vitamins & Supplements',description:'Iron supplement for iron-deficiency anemia.',usage_info:'1 tablet daily on empty stomach.',dosage_type:'Tablet, Syrup',aliases:['Iron supplement','Ferrous Fumarate'],brands:[
{id:'b237',name:'Ferogen',company:'Square Pharmaceuticals',dosage:'200mg',form:'Tablet'},
{id:'b238',name:'Haemojet',company:'Incepta Pharmaceuticals',dosage:'200mg',form:'Tablet'},
{id:'b239',name:'Femax',company:'Beximco Pharmaceuticals',dosage:'200mg',form:'Tablet'},
{id:'b240',name:'Fericon',company:'ACME Laboratories',dosage:'200mg',form:'Syrup'}]},
{id:'d052',generic_name:'Fluconazole',category:'Dental & Oral',description:'Antifungal for oral thrush and systemic fungal infections.',usage_info:'150mg single dose or 50-200mg daily.',dosage_type:'Capsule',aliases:['Diflucan'],brands:[
{id:'b241',name:'Flugal',company:'Square Pharmaceuticals',dosage:'150mg',form:'Capsule'},
{id:'b242',name:'Flucon',company:'Incepta Pharmaceuticals',dosage:'150mg',form:'Capsule'},
{id:'b243',name:'Diflu',company:'Beximco Pharmaceuticals',dosage:'150mg',form:'Capsule'},
{id:'b244',name:'Flucoz',company:'ACME Laboratories',dosage:'150mg',form:'Capsule'}]},
{id:'d053',generic_name:'Chlorhexidine',category:'Dental & Oral',description:'Antiseptic mouthwash for gingivitis and oral hygiene.',usage_info:'Rinse 10ml twice daily for 30 seconds.',dosage_type:'Mouthwash, Gel',aliases:['Hexidine'],brands:[
{id:'b245',name:'Hexisol',company:'Square Pharmaceuticals',dosage:'0.2%',form:'Mouthwash'},
{id:'b246',name:'Chlorhex',company:'Incepta Pharmaceuticals',dosage:'0.2%',form:'Mouthwash'},
{id:'b247',name:'Orex',company:'Beximco Pharmaceuticals',dosage:'0.12%',form:'Mouthwash'},
{id:'b248',name:'Hexidol',company:'ACME Laboratories',dosage:'0.2%',form:'Gel'}]},
{id:'d054',generic_name:'Albendazole',category:'Others',description:'Anthelmintic for intestinal worms and parasites.',usage_info:'400mg single dose. Repeat after 2 weeks if needed.',dosage_type:'Tablet, Syrup',aliases:['Zentel'],brands:[
{id:'b249',name:'Almex',company:'Square Pharmaceuticals',dosage:'400mg',form:'Tablet'},
{id:'b250',name:'Alben',company:'Beximco Pharmaceuticals',dosage:'400mg',form:'Tablet'},
{id:'b251',name:'Zentel',company:'Incepta Pharmaceuticals',dosage:'400mg',form:'Tablet'},
{id:'b252',name:'Bendex',company:'ACME Laboratories',dosage:'400mg',form:'Syrup'}]},
{id:'d055',generic_name:'Loperamide',category:'Others',description:'Antidiarrheal for acute and chronic diarrhea.',usage_info:'4mg initially, then 2mg after each loose stool. Max 16mg/day.',dosage_type:'Capsule',aliases:['Imodium'],brands:[
{id:'b253',name:'Lopamide',company:'Square Pharmaceuticals',dosage:'2mg',form:'Capsule'},
{id:'b254',name:'Imotil',company:'Incepta Pharmaceuticals',dosage:'2mg',form:'Capsule'},
{id:'b255',name:'Loper',company:'Beximco Pharmaceuticals',dosage:'2mg',form:'Capsule'},
{id:'b256',name:'Loperin',company:'ACME Laboratories',dosage:'2mg',form:'Capsule'}]},
{id:'d056',generic_name:'Aspirin',category:'Heart & Blood Pressure',description:'Antiplatelet and analgesic for cardiovascular protection.',usage_info:'75-150mg once daily for cardiac; 300-600mg for pain.',dosage_type:'Tablet',aliases:['Acetylsalicylic Acid'],brands:[
{id:'b257',name:'Ecosprin',company:'Square Pharmaceuticals',dosage:'75mg',form:'Tablet'},
{id:'b258',name:'Disprin',company:'Beximco Pharmaceuticals',dosage:'300mg',form:'Tablet'},
{id:'b259',name:'Ascard',company:'Incepta Pharmaceuticals',dosage:'75mg',form:'Tablet'},
{id:'b260',name:'Loprin',company:'ACME Laboratories',dosage:'75mg',form:'Tablet'}]},
{id:'d057',generic_name:'Ramipril',category:'Heart & Blood Pressure',description:'ACE inhibitor for hypertension and heart failure.',usage_info:'2.5-10mg once daily.',dosage_type:'Capsule',aliases:['Altace'],brands:[
{id:'b261',name:'Ramace',company:'Square Pharmaceuticals',dosage:'5mg',form:'Capsule'},
{id:'b262',name:'Ramipro',company:'Incepta Pharmaceuticals',dosage:'5mg',form:'Capsule'},
{id:'b263',name:'Ramilich',company:'Beximco Pharmaceuticals',dosage:'5mg',form:'Capsule'},
{id:'b264',name:'Cardipril',company:'ACME Laboratories',dosage:'5mg',form:'Capsule'}]},
{id:'d058',generic_name:'Telmisartan',category:'Heart & Blood Pressure',description:'ARB for hypertension and cardiovascular risk reduction.',usage_info:'40-80mg once daily.',dosage_type:'Tablet',aliases:['Micardis'],brands:[
{id:'b265',name:'Telma',company:'Square Pharmaceuticals',dosage:'40mg',form:'Tablet'},
{id:'b266',name:'Telsar',company:'Incepta Pharmaceuticals',dosage:'40mg',form:'Tablet'},
{id:'b267',name:'Telmid',company:'Beximco Pharmaceuticals',dosage:'40mg',form:'Tablet'},
{id:'b268',name:'Telvas',company:'ACME Laboratories',dosage:'40mg',form:'Tablet'},
{id:'b269',name:'Arbitel',company:'Aristopharma',dosage:'40mg',form:'Tablet'}]},
{id:'d059',generic_name:'Bisoprolol',category:'Heart & Blood Pressure',description:'Selective beta-blocker for hypertension and heart failure.',usage_info:'5-10mg once daily.',dosage_type:'Tablet',aliases:['Concor'],brands:[
{id:'b270',name:'Biso',company:'Square Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b271',name:'Biscard',company:'Incepta Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b272',name:'Concor',company:'Beximco Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b273',name:'Bisolol',company:'ACME Laboratories',dosage:'5mg',form:'Tablet'}]},
{id:'d060',generic_name:'Enalapril',category:'Heart & Blood Pressure',description:'ACE inhibitor for hypertension and heart failure.',usage_info:'5-20mg once or twice daily.',dosage_type:'Tablet',aliases:['Vasotec'],brands:[
{id:'b274',name:'Enalap',company:'Square Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b275',name:'Enapril',company:'Incepta Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b276',name:'Enacard',company:'Beximco Pharmaceuticals',dosage:'5mg',form:'Tablet'}]},
{id:'d061',generic_name:'Rosuvastatin',category:'Heart & Blood Pressure',description:'Statin for high cholesterol and cardiovascular prevention.',usage_info:'5-20mg once daily at bedtime.',dosage_type:'Tablet',aliases:['Crestor'],brands:[
{id:'b277',name:'Rosuva',company:'Square Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b278',name:'Crestin',company:'Incepta Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b279',name:'Rostat',company:'Beximco Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b280',name:'Rosulip',company:'ACME Laboratories',dosage:'10mg',form:'Tablet'},
{id:'b281',name:'Rovast',company:'Aristopharma',dosage:'10mg',form:'Tablet'}]},
{id:'d062',generic_name:'Atorvastatin',category:'Heart & Blood Pressure',description:'Statin for hypercholesterolemia.',usage_info:'10-80mg once daily.',dosage_type:'Tablet',aliases:['Lipitor'],brands:[
{id:'b282',name:'Atorva',company:'Square Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b283',name:'Tiginor',company:'Incepta Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b284',name:'Atocor',company:'Beximco Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b285',name:'Lipicard',company:'ACME Laboratories',dosage:'20mg',form:'Tablet'}]},
{id:'d063',generic_name:'Mefenamic Acid',category:'Fever & Pain',description:'NSAID for mild to moderate pain and dysmenorrhea.',usage_info:'500mg three times daily after food.',dosage_type:'Capsule',aliases:['Ponstan'],brands:[
{id:'b286',name:'Ponstan',company:'Square Pharmaceuticals',dosage:'500mg',form:'Capsule'},
{id:'b287',name:'Mefac',company:'Incepta Pharmaceuticals',dosage:'500mg',form:'Capsule'},
{id:'b288',name:'Mefast',company:'Beximco Pharmaceuticals',dosage:'250mg',form:'Capsule'},
{id:'b289',name:'Opistan',company:'ACME Laboratories',dosage:'500mg',form:'Capsule'}]},
{id:'d064',generic_name:'Tramadol',category:'Fever & Pain',description:'Opioid analgesic for moderate to severe pain.',usage_info:'50-100mg every 4-6 hours. Max 400mg/day.',dosage_type:'Capsule, Injection',aliases:['Ultram'],brands:[
{id:'b290',name:'Tramal',company:'Square Pharmaceuticals',dosage:'50mg',form:'Capsule'},
{id:'b291',name:'Tradol',company:'Incepta Pharmaceuticals',dosage:'50mg',form:'Capsule'},
{id:'b292',name:'Tramadil',company:'Beximco Pharmaceuticals',dosage:'50mg',form:'Capsule'},
{id:'b293',name:'Kontral',company:'ACME Laboratories',dosage:'50mg',form:'Capsule'}]},
{id:'d065',generic_name:'Aceclofenac',category:'Fever & Pain',description:'NSAID for osteoarthritis and rheumatoid arthritis.',usage_info:'100mg twice daily after meals.',dosage_type:'Tablet',aliases:[],brands:[
{id:'b294',name:'Acenac',company:'Square Pharmaceuticals',dosage:'100mg',form:'Tablet'},
{id:'b295',name:'Aceclo',company:'Incepta Pharmaceuticals',dosage:'100mg',form:'Tablet'},
{id:'b296',name:'Preserv',company:'Beximco Pharmaceuticals',dosage:'100mg',form:'Tablet'},
{id:'b297',name:'Aclofen',company:'Aristopharma',dosage:'100mg',form:'Tablet'}]},
{id:'d066',generic_name:'Etoricoxib',category:'Fever & Pain',description:'COX-2 inhibitor for arthritis and acute pain.',usage_info:'60-120mg once daily.',dosage_type:'Tablet',aliases:['Arcoxia'],brands:[
{id:'b298',name:'Etorix',company:'Square Pharmaceuticals',dosage:'90mg',form:'Tablet'},
{id:'b299',name:'Etocox',company:'Incepta Pharmaceuticals',dosage:'60mg',form:'Tablet'},
{id:'b300',name:'Coxet',company:'Beximco Pharmaceuticals',dosage:'90mg',form:'Tablet'},
{id:'b301',name:'Etoshine',company:'ACME Laboratories',dosage:'60mg',form:'Tablet'}]},
{id:'d067',generic_name:'Cephalexin',category:'Antibiotics',description:'First-gen cephalosporin for skin, UTI, and respiratory infections.',usage_info:'250-500mg every 6 hours for 7-14 days.',dosage_type:'Capsule, Syrup',aliases:['Keflex'],brands:[
{id:'b302',name:'Cephalex',company:'Square Pharmaceuticals',dosage:'500mg',form:'Capsule'},
{id:'b303',name:'Cefalin',company:'Incepta Pharmaceuticals',dosage:'500mg',form:'Capsule'},
{id:'b304',name:'Lexin',company:'Beximco Pharmaceuticals',dosage:'500mg',form:'Capsule'},
{id:'b305',name:'Ospexin',company:'ACME Laboratories',dosage:'500mg',form:'Capsule'}]},
{id:'d068',generic_name:'Cefuroxime',category:'Antibiotics',description:'Second-gen cephalosporin for ENT, respiratory, and UTI.',usage_info:'250-500mg twice daily for 7-10 days.',dosage_type:'Tablet, Injection',aliases:['Zinacef'],brands:[
{id:'b306',name:'Cefotil',company:'Square Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b307',name:'Suruxim',company:'Incepta Pharmaceuticals',dosage:'250mg',form:'Tablet'},
{id:'b308',name:'Cefur',company:'Beximco Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b309',name:'Zinnat',company:'ACME Laboratories',dosage:'500mg',form:'Tablet'}]},
{id:'d069',generic_name:'Fluoxetine',category:'Mental Health',description:'SSRI for depression, OCD, and bulimia nervosa.',usage_info:'20mg once daily in the morning.',dosage_type:'Capsule',aliases:['Prozac'],brands:[
{id:'b310',name:'Fluox',company:'Square Pharmaceuticals',dosage:'20mg',form:'Capsule'},
{id:'b311',name:'Fluxen',company:'Incepta Pharmaceuticals',dosage:'20mg',form:'Capsule'},
{id:'b312',name:'Oxadep',company:'Beximco Pharmaceuticals',dosage:'20mg',form:'Capsule'},
{id:'b313',name:'Flutine',company:'ACME Laboratories',dosage:'20mg',form:'Capsule'}]},
{id:'d070',generic_name:'Amitriptyline',category:'Mental Health',description:'Tricyclic antidepressant for depression and neuropathic pain.',usage_info:'25-150mg at bedtime.',dosage_type:'Tablet',aliases:['Elavil'],brands:[
{id:'b314',name:'Amitrip',company:'Square Pharmaceuticals',dosage:'25mg',form:'Tablet'},
{id:'b315',name:'Tripta',company:'Incepta Pharmaceuticals',dosage:'25mg',form:'Tablet'},
{id:'b316',name:'Amit',company:'Beximco Pharmaceuticals',dosage:'25mg',form:'Tablet'}]},
{id:'d071',generic_name:'Lansoprazole',category:'Gastric & Digestive',description:'PPI for GERD and peptic ulcers.',usage_info:'15-30mg once daily before breakfast.',dosage_type:'Capsule',aliases:['Prevacid'],brands:[
{id:'b317',name:'Lanzo',company:'Square Pharmaceuticals',dosage:'30mg',form:'Capsule'},
{id:'b318',name:'Lansec',company:'Incepta Pharmaceuticals',dosage:'30mg',form:'Capsule'},
{id:'b319',name:'Lanzol',company:'Beximco Pharmaceuticals',dosage:'30mg',form:'Capsule'},
{id:'b320',name:'Lanpro',company:'ACME Laboratories',dosage:'30mg',form:'Capsule'}]},
{id:'d072',generic_name:'Sucralfate',category:'Gastric & Digestive',description:'Mucosal protectant for gastric and duodenal ulcers.',usage_info:'1g four times daily before meals.',dosage_type:'Tablet, Suspension',aliases:['Carafate'],brands:[
{id:'b321',name:'Sucral',company:'Square Pharmaceuticals',dosage:'1g',form:'Tablet'},
{id:'b322',name:'Ulsafate',company:'Incepta Pharmaceuticals',dosage:'1g',form:'Suspension'},
{id:'b323',name:'Sucramed',company:'Beximco Pharmaceuticals',dosage:'1g',form:'Tablet'}]},
{id:'d073',generic_name:'Famotidine',category:'Gastric & Digestive',description:'H2 blocker for heartburn and gastric ulcers.',usage_info:'20-40mg twice daily.',dosage_type:'Tablet',aliases:['Pepcid'],brands:[
{id:'b324',name:'Famotack',company:'Square Pharmaceuticals',dosage:'20mg',form:'Tablet'},
{id:'b325',name:'Famocid',company:'Incepta Pharmaceuticals',dosage:'20mg',form:'Tablet'},
{id:'b326',name:'Famotin',company:'Beximco Pharmaceuticals',dosage:'40mg',form:'Tablet'},
{id:'b327',name:'Peptidin',company:'ACME Laboratories',dosage:'20mg',form:'Tablet'}]},
{id:'d074',generic_name:'Vildagliptin',category:'Diabetes',description:'DPP-4 inhibitor for type 2 diabetes.',usage_info:'50mg once or twice daily.',dosage_type:'Tablet',aliases:['Galvus'],brands:[
{id:'b328',name:'Galvus',company:'Square Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b329',name:'Vilda',company:'Incepta Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b330',name:'Vildamet',company:'Beximco Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b331',name:'Vglip',company:'ACME Laboratories',dosage:'50mg',form:'Tablet'}]},
{id:'d075',generic_name:'Linagliptin',category:'Diabetes',description:'DPP-4 inhibitor for type 2 diabetes. No dose adjustment for kidneys.',usage_info:'5mg once daily.',dosage_type:'Tablet',aliases:['Tradjenta'],brands:[
{id:'b332',name:'Trajenta',company:'Square Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b333',name:'Linag',company:'Incepta Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b334',name:'Linapin',company:'Beximco Pharmaceuticals',dosage:'5mg',form:'Tablet'}]},
{id:'d076',generic_name:'Propranolol',category:'Heart & Blood Pressure',description:'Non-selective beta-blocker for hypertension, migraine, anxiety.',usage_info:'40mg 2-3 times daily.',dosage_type:'Tablet',aliases:['Inderal'],brands:[
{id:'b335',name:'Inderal',company:'Square Pharmaceuticals',dosage:'40mg',form:'Tablet'},
{id:'b336',name:'Propral',company:'Incepta Pharmaceuticals',dosage:'40mg',form:'Tablet'},
{id:'b337',name:'Betacard',company:'ACME Laboratories',dosage:'40mg',form:'Tablet'}]},
{id:'d077',generic_name:'Metoprolol',category:'Heart & Blood Pressure',description:'Cardioselective beta-blocker for hypertension and angina.',usage_info:'50-100mg 1-2 times daily.',dosage_type:'Tablet',aliases:['Lopressor'],brands:[
{id:'b338',name:'Metolar',company:'Square Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b339',name:'Metocard',company:'Incepta Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b340',name:'Seloken',company:'Beximco Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b341',name:'Metpro',company:'Aristopharma',dosage:'50mg',form:'Tablet'}]},
{id:'d078',generic_name:'Valsartan',category:'Heart & Blood Pressure',description:'ARB for hypertension and heart failure.',usage_info:'80-160mg once daily.',dosage_type:'Tablet',aliases:['Diovan'],brands:[
{id:'b342',name:'Valsar',company:'Square Pharmaceuticals',dosage:'80mg',form:'Tablet'},
{id:'b343',name:'Diostar',company:'Incepta Pharmaceuticals',dosage:'80mg',form:'Tablet'},
{id:'b344',name:'Valsac',company:'Beximco Pharmaceuticals',dosage:'80mg',form:'Tablet'},
{id:'b345',name:'Angiotan',company:'ACME Laboratories',dosage:'80mg',form:'Tablet'}]},
{id:'d079',generic_name:'Risperidone',category:'Mental Health',description:'Atypical antipsychotic for schizophrenia and bipolar.',usage_info:'1-6mg daily in 1-2 doses.',dosage_type:'Tablet',aliases:['Risperdal'],brands:[
{id:'b346',name:'Risperd',company:'Square Pharmaceuticals',dosage:'2mg',form:'Tablet'},
{id:'b347',name:'Risdon',company:'Incepta Pharmaceuticals',dosage:'2mg',form:'Tablet'},
{id:'b348',name:'Riscord',company:'Beximco Pharmaceuticals',dosage:'2mg',form:'Tablet'}]},
{id:'d080',generic_name:'Diazepam',category:'Mental Health',description:'Benzodiazepine for anxiety, muscle spasm, and seizures.',usage_info:'2-10mg 2-3 times daily. Short-term only.',dosage_type:'Tablet, Injection',aliases:['Valium'],brands:[
{id:'b349',name:'Sedil',company:'Square Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b350',name:'Diazer',company:'Incepta Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b351',name:'Valium',company:'Beximco Pharmaceuticals',dosage:'5mg',form:'Tablet'}]},
{id:'d081',generic_name:'Pregabalin',category:'Mental Health',description:'For neuropathic pain, epilepsy, and generalized anxiety.',usage_info:'75-300mg twice daily.',dosage_type:'Capsule',aliases:['Lyrica'],brands:[
{id:'b352',name:'Neurotin P',company:'Square Pharmaceuticals',dosage:'75mg',form:'Capsule'},
{id:'b353',name:'Prelin',company:'Incepta Pharmaceuticals',dosage:'75mg',form:'Capsule'},
{id:'b354',name:'Pregica',company:'Beximco Pharmaceuticals',dosage:'75mg',form:'Capsule'},
{id:'b355',name:'Prebalin',company:'ACME Laboratories',dosage:'75mg',form:'Capsule'},
{id:'b356',name:'Neugab',company:'Aristopharma',dosage:'150mg',form:'Capsule'}]},
{id:'d082',generic_name:'Gabapentin',category:'Mental Health',description:'Anticonvulsant for epilepsy and neuropathic pain.',usage_info:'300-600mg three times daily.',dosage_type:'Capsule',aliases:['Neurontin'],brands:[
{id:'b357',name:'Gabantin',company:'Square Pharmaceuticals',dosage:'300mg',form:'Capsule'},
{id:'b358',name:'Gabapen',company:'Incepta Pharmaceuticals',dosage:'300mg',form:'Capsule'},
{id:'b359',name:'Neuran',company:'Beximco Pharmaceuticals',dosage:'300mg',form:'Capsule'},
{id:'b360',name:'Gaba',company:'ACME Laboratories',dosage:'300mg',form:'Capsule'}]},
{id:'d083',generic_name:'Mupirocin',category:'Skin & Dermatology',description:'Topical antibiotic for impetigo and skin infections.',usage_info:'Apply 3 times daily for 10 days.',dosage_type:'Ointment',aliases:['Bactroban'],brands:[
{id:'b361',name:'Bactroban',company:'Square Pharmaceuticals',dosage:'2%',form:'Ointment'},
{id:'b362',name:'Mupiderm',company:'Incepta Pharmaceuticals',dosage:'2%',form:'Ointment'},
{id:'b363',name:'Mupicin',company:'Beximco Pharmaceuticals',dosage:'2%',form:'Ointment'}]},
{id:'d084',generic_name:'Clotrimazole',category:'Skin & Dermatology',description:'Antifungal for vaginal and skin fungal infections.',usage_info:'Apply cream twice daily or pessary at bedtime.',dosage_type:'Cream, Pessary',aliases:['Canesten'],brands:[
{id:'b364',name:'Canesten',company:'Square Pharmaceuticals',dosage:'1%',form:'Cream'},
{id:'b365',name:'Clomaz',company:'Incepta Pharmaceuticals',dosage:'1%',form:'Cream'},
{id:'b366',name:'Cloter',company:'Beximco Pharmaceuticals',dosage:'1%',form:'Cream'}]},
{id:'d085',generic_name:'Miconazole',category:'Dental & Oral',description:'Antifungal for oral and skin candidiasis.',usage_info:'Apply gel to affected area 4 times daily.',dosage_type:'Oral Gel, Cream',aliases:['Daktarin'],brands:[
{id:'b367',name:'Daktarin',company:'Square Pharmaceuticals',dosage:'2%',form:'Oral Gel'},
{id:'b368',name:'Micogel',company:'Incepta Pharmaceuticals',dosage:'2%',form:'Oral Gel'},
{id:'b369',name:'Fungidal',company:'Beximco Pharmaceuticals',dosage:'2%',form:'Oral Gel'}]},
{id:'d086',generic_name:'Nystatin',category:'Dental & Oral',description:'Antifungal for oral and intestinal candidiasis.',usage_info:'100,000 units 4 times daily.',dosage_type:'Suspension, Tablet',aliases:['Mycostatin'],brands:[
{id:'b370',name:'Nystop',company:'Square Pharmaceuticals',dosage:'100000IU/ml',form:'Suspension'},
{id:'b371',name:'Nystalin',company:'Incepta Pharmaceuticals',dosage:'500000IU',form:'Tablet'},
{id:'b372',name:'Candistin',company:'Beximco Pharmaceuticals',dosage:'100000IU/ml',form:'Suspension'}]},
{id:'d087',generic_name:'Ipratropium',category:'Asthma & Respiratory',description:'Anticholinergic bronchodilator for COPD.',usage_info:'20-40mcg 3-4 times daily via inhaler.',dosage_type:'Inhaler, Nebulizer',aliases:['Atrovent'],brands:[
{id:'b373',name:'Ipravent',company:'Square Pharmaceuticals',dosage:'20mcg',form:'Inhaler'},
{id:'b374',name:'Ipralin',company:'Incepta Pharmaceuticals',dosage:'250mcg/ml',form:'Nebulizer'},
{id:'b375',name:'Atrovent',company:'Beximco Pharmaceuticals',dosage:'20mcg',form:'Inhaler'}]},
{id:'d088',generic_name:'Tiotropium',category:'Asthma & Respiratory',description:'Long-acting anticholinergic for COPD maintenance.',usage_info:'18mcg inhaled once daily.',dosage_type:'Inhaler',aliases:['Spiriva'],brands:[
{id:'b376',name:'Spiriva',company:'Square Pharmaceuticals',dosage:'18mcg',form:'Inhaler'},
{id:'b377',name:'Tiova',company:'Incepta Pharmaceuticals',dosage:'18mcg',form:'Inhaler'},
{id:'b378',name:'Breva',company:'Aristopharma',dosage:'18mcg',form:'Inhaler'}]},
{id:'d089',generic_name:'Mebendazole',category:'Others',description:'Anthelmintic for pinworm, roundworm, hookworm.',usage_info:'100mg twice daily for 3 days or 500mg single dose.',dosage_type:'Tablet, Syrup',aliases:['Vermox'],brands:[
{id:'b379',name:'Vermox',company:'Square Pharmaceuticals',dosage:'100mg',form:'Tablet'},
{id:'b380',name:'Meben',company:'Incepta Pharmaceuticals',dosage:'100mg',form:'Tablet'},
{id:'b381',name:'Debendum',company:'Beximco Pharmaceuticals',dosage:'500mg',form:'Tablet'},
{id:'b382',name:'Mebex',company:'ACME Laboratories',dosage:'100mg',form:'Syrup'}]},
{id:'d090',generic_name:'ORS',category:'Others',description:'Oral rehydration salts for dehydration from diarrhea.',usage_info:'Dissolve 1 sachet in 1L water. Drink as needed.',dosage_type:'Sachet',aliases:['Oral Rehydration Salt','Saline'],brands:[
{id:'b383',name:'ORSaline',company:'Square Pharmaceuticals',dosage:'20.5g',form:'Sachet'},
{id:'b384',name:'Tasty Saline',company:'ACME Laboratories',dosage:'20.5g',form:'Sachet'},
{id:'b385',name:'Saline-R',company:'Incepta Pharmaceuticals',dosage:'20.5g',form:'Sachet'},
{id:'b386',name:'GlucoORS',company:'Beximco Pharmaceuticals',dosage:'20.5g',form:'Sachet'},
{id:'b387',name:'ORS Plus',company:'Aristopharma',dosage:'20.5g',form:'Sachet'}]},
{id:'d091',generic_name:'Sildenafil',category:'Others',description:'PDE5 inhibitor for erectile dysfunction and PAH.',usage_info:'50mg 1 hour before activity. Max once daily.',dosage_type:'Tablet',aliases:['Viagra'],brands:[
{id:'b388',name:'Revatio',company:'Square Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b389',name:'Sidnaf',company:'Incepta Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b390',name:'Viagra BD',company:'Beximco Pharmaceuticals',dosage:'50mg',form:'Tablet'},
{id:'b391',name:'Sidena',company:'ACME Laboratories',dosage:'100mg',form:'Tablet'}]},
{id:'d092',generic_name:'Tadalafil',category:'Others',description:'Long-acting PDE5 inhibitor for ED and BPH.',usage_info:'10-20mg before activity or 5mg daily.',dosage_type:'Tablet',aliases:['Cialis'],brands:[
{id:'b392',name:'Tazalis',company:'Square Pharmaceuticals',dosage:'20mg',form:'Tablet'},
{id:'b393',name:'Tadala',company:'Incepta Pharmaceuticals',dosage:'20mg',form:'Tablet'},
{id:'b394',name:'Cialis BD',company:'Beximco Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b395',name:'Tadafil',company:'ACME Laboratories',dosage:'20mg',form:'Tablet'}]},
{id:'d093',generic_name:'Folic Acid',category:'Vitamins & Supplements',description:'B vitamin for anemia prevention and pregnancy support.',usage_info:'5mg once daily.',dosage_type:'Tablet',aliases:['Folate','Vitamin B9'],brands:[
{id:'b396',name:'Folison',company:'Square Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b397',name:'Folvit',company:'Incepta Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b398',name:'Folac',company:'Beximco Pharmaceuticals',dosage:'5mg',form:'Tablet'}]},
{id:'d094',generic_name:'Vitamin B Complex',category:'Vitamins & Supplements',description:'B-group vitamins for energy and nerve function.',usage_info:'1 tablet daily.',dosage_type:'Tablet, Syrup',aliases:['B Complex'],brands:[
{id:'b399',name:'Bexon',company:'Square Pharmaceuticals',dosage:'combo',form:'Tablet'},
{id:'b400',name:'Becosule',company:'Incepta Pharmaceuticals',dosage:'combo',form:'Capsule'},
{id:'b401',name:'Neurobex',company:'Beximco Pharmaceuticals',dosage:'combo',form:'Tablet'},
{id:'b402',name:'B-Lex',company:'ACME Laboratories',dosage:'combo',form:'Tablet'}]},
{id:'d095',generic_name:'Zinc',category:'Vitamins & Supplements',description:'Mineral supplement for immunity and diarrhea management in children.',usage_info:'20mg daily for 10-14 days (children).',dosage_type:'Tablet, Syrup',aliases:['Zinc Sulfate'],brands:[
{id:'b403',name:'Baby Zinc',company:'Square Pharmaceuticals',dosage:'20mg',form:'Tablet'},
{id:'b404',name:'Zinkid',company:'Incepta Pharmaceuticals',dosage:'20mg',form:'Syrup'},
{id:'b405',name:'Zinco',company:'Beximco Pharmaceuticals',dosage:'20mg',form:'Tablet'}]},
{id:'d096',generic_name:'Phenylephrine',category:'Cold & Allergy',description:'Decongestant for nasal congestion.',usage_info:'10mg every 4 hours. Often in combinations.',dosage_type:'Tablet, Syrup',aliases:[],brands:[
{id:'b406',name:'Neosynephrine',company:'Square Pharmaceuticals',dosage:'10mg',form:'Tablet'},
{id:'b407',name:'Phenyl',company:'Incepta Pharmaceuticals',dosage:'5mg',form:'Syrup'},
{id:'b408',name:'Nasoclear',company:'ACME Laboratories',dosage:'10mg',form:'Tablet'}]},
{id:'d097',generic_name:'Dextromethorphan',category:'Cold & Allergy',description:'Cough suppressant for dry, non-productive cough.',usage_info:'10-20mg every 4 hours.',dosage_type:'Syrup',aliases:['DXM'],brands:[
{id:'b409',name:'Dextro',company:'Square Pharmaceuticals',dosage:'15mg/5ml',form:'Syrup'},
{id:'b410',name:'Tusca-D',company:'Incepta Pharmaceuticals',dosage:'10mg/5ml',form:'Syrup'},
{id:'b411',name:'Coughex',company:'Beximco Pharmaceuticals',dosage:'15mg/5ml',form:'Syrup'},
{id:'b412',name:'Tussidex',company:'ACME Laboratories',dosage:'10mg/5ml',form:'Syrup'}]},
{id:'d098',generic_name:'Chlorpheniramine',category:'Cold & Allergy',description:'First-gen antihistamine for allergy and common cold.',usage_info:'4mg every 4-6 hours.',dosage_type:'Tablet, Syrup',aliases:['CPM','Piriton'],brands:[
{id:'b413',name:'Piriton',company:'Square Pharmaceuticals',dosage:'4mg',form:'Tablet'},
{id:'b414',name:'Alergin',company:'Incepta Pharmaceuticals',dosage:'4mg',form:'Tablet'},
{id:'b415',name:'Histal',company:'Beximco Pharmaceuticals',dosage:'2mg/5ml',form:'Syrup'}]},
{id:'d099',generic_name:'Warfarin',category:'Heart & Blood Pressure',description:'Anticoagulant for prevention of blood clots.',usage_info:'Dose individualized based on INR monitoring.',dosage_type:'Tablet',aliases:['Coumadin'],brands:[
{id:'b416',name:'Warfin',company:'Square Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b417',name:'Marfarin',company:'Incepta Pharmaceuticals',dosage:'5mg',form:'Tablet'},
{id:'b418',name:'Coumad',company:'Beximco Pharmaceuticals',dosage:'5mg',form:'Tablet'}]},
{id:'d100',generic_name:'Digoxin',category:'Heart & Blood Pressure',description:'Cardiac glycoside for heart failure and atrial fibrillation.',usage_info:'0.125-0.25mg once daily.',dosage_type:'Tablet',aliases:['Lanoxin'],brands:[
{id:'b419',name:'Digox',company:'Square Pharmaceuticals',dosage:'0.25mg',form:'Tablet'},
{id:'b420',name:'Lanoxin',company:'Incepta Pharmaceuticals',dosage:'0.25mg',form:'Tablet'},
{id:'b421',name:'Cardixin',company:'Beximco Pharmaceuticals',dosage:'0.25mg',form:'Tablet'}]},
{id:'d101',generic_name:'Spironolactone',category:'Heart & Blood Pressure',description:'Potassium-sparing diuretic for heart failure and edema.',usage_info:'25-100mg once daily.',dosage_type:'Tablet',aliases:['Aldactone'],brands:[
{id:'b422',name:'Aldactone',company:'Square Pharmaceuticals',dosage:'25mg',form:'Tablet'},
{id:'b423',name:'Spiron',company:'Incepta Pharmaceuticals',dosage:'25mg',form:'Tablet'},
{id:'b424',name:'Spicard',company:'ACME Laboratories',dosage:'25mg',form:'Tablet'},
{id:'b425',name:'Spiroton',company:'Beximco Pharmaceuticals',dosage:'25mg',form:'Tablet'}]},
{id:'d102',generic_name:'Furosemide',category:'Heart & Blood Pressure',description:'Loop diuretic for edema and hypertension.',usage_info:'20-80mg once or twice daily.',dosage_type:'Tablet, Injection',aliases:['Lasix'],brands:[
{id:'b426',name:'Lasix',company:'Square Pharmaceuticals',dosage:'40mg',form:'Tablet'},
{id:'b427',name:'Frusid',company:'Incepta Pharmaceuticals',dosage:'40mg',form:'Tablet'},
{id:'b428',name:'Fusid',company:'Beximco Pharmaceuticals',dosage:'40mg',form:'Tablet'},
{id:'b429',name:'Frumax',company:'ACME Laboratories',dosage:'40mg',form:'Tablet'}]},
{id:'d103',generic_name:'Levothyroxine',category:'Others',description:'Thyroid hormone replacement for hypothyroidism.',usage_info:'25-200mcg once daily on empty stomach.',dosage_type:'Tablet',aliases:['Synthroid','Thyroxine'],brands:[
{id:'b430',name:'Thyrin',company:'Square Pharmaceuticals',dosage:'50mcg',form:'Tablet'},
{id:'b431',name:'Thyrox',company:'Incepta Pharmaceuticals',dosage:'50mcg',form:'Tablet'},
{id:'b432',name:'Oroxin',company:'Beximco Pharmaceuticals',dosage:'100mcg',form:'Tablet'},
{id:'b433',name:'Euthyrox',company:'ACME Laboratories',dosage:'50mcg',form:'Tablet'}]},
{id:'d104',generic_name:'Hydroxychloroquine',category:'Others',description:'For rheumatoid arthritis, lupus, and malaria.',usage_info:'200-400mg daily.',dosage_type:'Tablet',aliases:['Plaquenil'],brands:[
{id:'b434',name:'Oxiquin',company:'Square Pharmaceuticals',dosage:'200mg',form:'Tablet'},
{id:'b435',name:'HCQS',company:'Incepta Pharmaceuticals',dosage:'200mg',form:'Tablet'},
{id:'b436',name:'Plaquenil',company:'Beximco Pharmaceuticals',dosage:'200mg',form:'Tablet'}]},
{id:'d105',generic_name:'Ondansetron',category:'Others',description:'Antiemetic for nausea and vomiting, especially post-surgery/chemo.',usage_info:'4-8mg every 8 hours as needed.',dosage_type:'Tablet, Injection',aliases:['Zofran'],brands:[
{id:'b437',name:'Emistat',company:'Square Pharmaceuticals',dosage:'4mg',form:'Tablet'},
{id:'b438',name:'Ondan',company:'Incepta Pharmaceuticals',dosage:'4mg',form:'Tablet'},
{id:'b439',name:'Emeset',company:'Beximco Pharmaceuticals',dosage:'4mg',form:'Tablet'},
{id:'b440',name:'Ondaset',company:'ACME Laboratories',dosage:'8mg',form:'Tablet'},
{id:'b441',name:'Vomirest',company:'Aristopharma',dosage:'4mg',form:'Tablet'}]}
];
module.exports = { drugs };
